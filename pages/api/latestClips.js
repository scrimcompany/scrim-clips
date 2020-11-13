import { admin } from '../../utils/auth/firebaseAdmin'

export default async function latestClips(req, res) {
    try {
        const docSnap = await admin.firestore().collection("clips").orderBy('created', 'desc').limit(6).get();
        const data = [];
        docSnap.forEach(doc => {
            data.push(doc.data())
        });

        res.status(200).json(data);
    } catch (e) {
        res.status(400).send(e);
    }
}