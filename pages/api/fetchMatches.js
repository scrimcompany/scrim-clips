import { admin } from '../../utils/auth/firebaseAdmin'
import last from 'lodash/last';

import * as AWS from "aws-sdk";
const credentials = new AWS.Credentials(
    process.env.AWS_CRED_AKID,
    process.env.AWS_CRED_SECRET
);
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-west-2" });
const queueURL = "https://sqs.us-west-2.amazonaws.com/358811376164/scrim-matchcodes";
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const API_URL_GETNEXTMATCH = "https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1"

const fetchMatches = async (req, res) => {
    try {
        const autoCodesRef = await admin
            .firestore()
            .collection("authcodes")
            .get();

        const promises = [];

        autoCodesRef.forEach(doc => {
            let secrets = Object.assign(doc.data(), { uid: doc.id });

            const promise = new Promise(async (resolve, reject) => {
                const getNextMatch = async (steamId, authCode, matchToken) => {
                    const url = new URL(API_URL_GETNEXTMATCH);

                    url.searchParams.append("key", process.env.STEAM_WEB_API_KEY);
                    url.searchParams.append("steamid", steamId);
                    url.searchParams.append("steamidkey", authCode);
                    url.searchParams.append("knowncode", matchToken);

                    const response = await fetch(url.href, {
                        method: 'GET',
                        headers: new Headers({ 'Content-Type': 'application/json' })
                    });

                    const json = await response.json();

                    if (json.result && json.result.nextcode && json.result.nextcode !== "n/a") {

                        return json.result.nextcode;
                    }

                    return;
                }

                let fetching = true;
                let matchTokens = [];

                while (fetching) {
                    const nextMatchToken = await getNextMatch(secrets.steamId, secrets.authCode, secrets.latestMatchToken || secrets.matchToken);

                    if (!nextMatchToken) {
                        fetching = false;
                    } else {
                        secrets.latestMatchToken = nextMatchToken;
                        matchTokens.push(nextMatchToken);

                        try {
                            sqs.sendMessage({
                                MessageBody: nextMatchToken,
                                QueueUrl: queueURL,
                            }, function (err, data) {
                                if (err) {
                                    console.log("Error", err);
                                } else {
                                    console.log("Success", data.MessageId);
                                }
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                resolve({
                    uid: secrets.uid,
                    steamId: secrets.steamId,
                    matchTokens
                });
            });

            promises.push(promise);
        });

        const results = await Promise.all(promises);
        console.log(results);

        try {
            const batch = admin.firestore().batch();

            results.forEach(result => {
                result.matchTokens.forEach(match => {
                    const ref = admin.firestore().collection("matches").doc(match);
                    batch.set(ref, {
                        created: admin.firestore.FieldValue.serverTimestamp(),
                        players: admin.firestore.FieldValue.arrayUnion(result.steamId)
                    }, { merge: true });
                });

                const ref = admin.firestore().collection("authcodes").doc(result.uid);
                batch.set(ref, {
                    latestMatchToken: last(result.matchTokens)
                }, { merge: true });
            });

            await batch.commit();
        } catch (e) {

        }

        return res.status(200).json("OK");
    } catch (e) {
        return res.status(400).json(e);
    }
}

export default fetchMatches
