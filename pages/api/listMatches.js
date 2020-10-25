import { admin } from '../../utils/auth/firebaseAdmin'

const listMatches = async (req, res) => {
    return admin
        .firestore()
        .collection("matches")
        .orderBy('created', 'desc')
        .limit(10)
        .get()
        .then(snap => {
            const matches = [];

            snap.docs.forEach(doc => {
                const match = Object.assign(doc.data(), { id: doc.id });
                matches.push(match);
            });

            return res.status(200).json({
                matches
            });
        })
}

export default listMatches
