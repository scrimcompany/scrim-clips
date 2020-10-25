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

    try {
        const authcode = await admin.firestore().collection("authcodes").doc(uid).get();
        const steamId = authcode.data() && authcode.data().steamId;

        return admin
            .firestore()
            .collection("matches")
            .where("players", "array-contains", steamId)
            .get()
            .then(snap => {
                const matches = [];
                snap.docs.forEach(doc => {
                    const match = Object.assign(doc.data(), { id: doc.id });
                    match.created = match.created.toDate();
                    matches.push(match);
                });

                return res.status(200).json({
                    matches
                })
            });
    } catch (e) {
        return res.status(200).json({
            matches: []
        })
    }

}