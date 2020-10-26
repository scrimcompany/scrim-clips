import { admin } from '../../utils/auth/firebaseAdmin'

const saveClips = async (req, res) => {
    const { matchToken, steamId, uid } = req.query;
    let data = req.body && req.body[steamId];

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

    return send(uid).then(function (data) {
        console.log('API called successfully. Returned data:');
        console.log(data);
        return res.status(200).json("OK")
    }, function (error) {
        console.error(error);
        return res.status(401).send(error);
    });
}

export default saveClips
