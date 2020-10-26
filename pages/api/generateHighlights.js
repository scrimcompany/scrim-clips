import { verifyIdToken, admin } from '../../utils/auth/firebaseAdmin'

import * as AWS from "aws-sdk";
const credentials = new AWS.Credentials(
    process.env.AWS_CRED_AKID,
    process.env.AWS_CRED_SECRET
);
AWS.config.credentials = credentials;
AWS.config.update({ region: "us-west-2" });
const queueURL = "https://sqs.us-west-2.amazonaws.com/358811376164/scrim-demos";
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const generateHighlights = async (req, res) => {
    const token = req.headers.token
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

    try {
        const { matchId, demoUrl } = req.body;
        const message = `${matchId} ${demoUrl} ${steamId} ${uid}`;
        sqs.sendMessage({
            MessageBody: message,
            QueueUrl: queueURL,
        }, function (err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", message);
            }
        });
        return res.status(200).json("OK");
    } catch (e) {
        return res.status(400).json(e);
    }
}

export default generateHighlights
