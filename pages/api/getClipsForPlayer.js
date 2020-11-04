import { admin } from '../../utils/auth/firebaseAdmin'

export default async function getClipsForPlayer(req, res) {
    if (!req.query.steamId) return res.status(404).json({});
    if (!req.query.matchToken) return res.status(404).json({});

    try {
        const docSnap = await admin.firestore().collection("clips").where("steamId", "==", req.query.steamId).where("matchToken", "==", req.query.matchToken).get();
        const data = [];
        docSnap.forEach(doc => {
            const docData = doc.data();
            docData.created = docData.created.toDate && docData.created.toDate().getTime();
            data.push(docData);
        });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}