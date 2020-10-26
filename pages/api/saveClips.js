import { admin } from '../../utils/auth/firebaseAdmin'

import { send } from '../../utils/email/sendinblue'

const saveClips = async (req, res) => {
    const { matchToken, steamId, uid } = req.query;
    let data = req.body && req.body[steamId];

    if (!data) {
        await admin.firestore().collection("matches").doc(matchToken).set({
            generatedFor: admin.firestore.FieldValue.arrayUnion(uid)
        }, { merge: true })

        return res.status(200).json("OK");
    }

    if (!matchToken || !steamId || !uid) {
        return res.status(401).send("Invalid query params");
    }

    try {
        await admin.firestore().collection("matches").doc(matchToken).collection("clips").doc(steamId).set(data);
        await admin.firestore().collection("matches").doc(matchToken).set({
            generatedFor: admin.firestore.FieldValue.arrayUnion(uid)
        }, { merge: true })
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }

    const clips = data && Object.keys(data) && Object.keys(data).map(round => data[round]);

    return send(uid, `https://clips.scrim.app/m/${matchToken}?steamId=${steamId}`, clips).then(function (data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
        return res.status(200).json("OK")
    }, function (error) {
        console.error(error);
        return res.status(401).send(error);
    });
}

export default saveClips
