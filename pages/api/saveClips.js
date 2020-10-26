import { admin } from '../../utils/auth/firebaseAdmin'

const saveClips = async (req, res) => {
    const matchToken = req.query.matchToken;
    const steamId = req.query.steamId;
    const json = req.body;
    const byRound = json[steamId];

    try {
        await admin.firestore().collection("matches").doc(matchToken).collection("clips").doc(steamId).set(byRound);
        return res.status(200).json("OK")
    } catch (error) {
        console.log(error);
        return res.status(401).send(error);
    }
}

export default saveClips
