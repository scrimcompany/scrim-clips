import * as admin from 'firebase-admin'
import { verifyIdToken } from '../../utils/auth/firebaseAdmin'

export default async function getMyMatches(req, res) {
    const token = req.headers.token
    let uid;

    try {
        const decodedToken = await verifyIdToken(token);
        uid = decodedToken.uid;
    } catch (error) {
        return res.status(401).send('You are unauthorised')
    }

    return admin
        .firestore()
        .collection("matches")
        .where("players", "array-contains", uid)
        .get()
        .then(snap => {
            const matches = [];
            snap.docs.forEach(doc => {
                const match = Object.assign(doc.data(), { id: doc.id });
                matches.push(match);
            });

            return res.status(200).json({
                matches
            })
        });
}