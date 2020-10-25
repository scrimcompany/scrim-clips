import { verifyIdToken, admin } from '../../utils/auth/firebaseAdmin'

export default async function getMatchAuthCode(req, res) {
    const token = req.headers.token
    let uid;

    try {
        const decodedToken = await verifyIdToken(token);
        uid = decodedToken.uid;
    } catch (error) {
        return res.status(401).send(error)
    }

    try {
        const docRes = await admin.firestore().collection("authcodes").doc(uid).get();

        if (!docRes.exists) return res.status(404).send("Not found")

        return res.status(200).json(docRes.data());
    } catch (error) {
        return res.status(401).send(error.message)
    }
}
