import { admin } from '../../utils/auth/firebaseAdmin'

export default async function getClipsForPlayer(req, res) {
    try {
        const docSnap = await admin.firestore().collection("clips").where("steamId", "==", req.query.steamId).get();
        if (!docSnap.exists) {
            return res.status(404).send({});
        }

        const data = docSnap.data();

        res.status(200).json(data);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}