import * as admin from 'firebase-admin'

const listMatches = async (req, res) => {
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // https://stackoverflow.com/a/41044630/1332513
                privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
            }),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        })
    }

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
