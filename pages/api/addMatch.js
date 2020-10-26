import { admin, verifyIdToken } from '../../utils/auth/firebaseAdmin'

import * as AWS from "aws-sdk";
const credentials = new AWS.Credentials(
    process.env.AWS_CRED_AKID,
    process.env.AWS_CRED_SECRET
);
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-west-2" });
const queueURL = "https://sqs.us-west-2.amazonaws.com/358811376164/scrim-matchcodes";
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const addMatch = async (req, res) => {
    const matchToken = req.body.matchToken;
    const token = req.headers.token;
    let uid;
    let steamId;

    try {
        const decodedToken = await verifyIdToken(token);
        uid = decodedToken.uid;


        const authCodeSnap = await admin.firestore().collection("authcodes").doc(uid).get();
        const authCode = authCodeSnap.data();

        steamId = authCode.steamId;
    } catch (error) {
        return res.status(401).send(error)
    }

    if (!steamId) {
        return res.status(401).send('steamId missing')
    }

    await admin.firestore().collection("matches").doc(matchToken).set({
        created: admin.firestore.FieldValue.serverTimestamp(),
        requestBy: admin.firestore.FieldValue.arrayUnion(uid)
    }, { merge: true });

    try {
        sqs.sendMessage({
            MessageBody: `${matchToken} ${steamId} ${uid}`,
            QueueUrl: queueURL,
        }, function (err, data) {
            if (err) {
                console.log("Error", err);
                return res.status(400).json(e);
            } else {
                console.log("Success", data.MessageId);
                return res.status(200).send("OK");
            }
        });
    } catch (e) {
        return res.status(400).json(e);
    }
}

export default addMatch
