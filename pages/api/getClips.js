import { admin } from '../../utils/auth/firebaseAdmin'

export default async function getClips(req, res) {
    try {
        const docSnap = await admin.firestore().collection("matches").doc(req.query.matchToken).collection("clips").doc(req.query.steamId).get();
        const data = docSnap.data();

        res.status(200).json(data);
    } catch (e) {
        res.status(400).send(e);
    }
}