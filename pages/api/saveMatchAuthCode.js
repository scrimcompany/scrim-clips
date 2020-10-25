import { verifyIdToken, admin } from '../../utils/auth/firebaseAdmin'

export default async function saveMatchAuthCode(req, res) {
    const token = req.headers.token
    let uid;

    try {
        const decodedToken = await verifyIdToken(token);
        uid = decodedToken.uid;
    } catch (error) {
        return res.status(401).send('You are unauthorised')
    }

    const url = new URL("https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1");
    url.searchParams.append("key", process.env.STEAM_WEB_API_KEY);
    url.searchParams.append("steamid", req.body.steamId);
    url.searchParams.append("steamidkey", req.body.authCode);
    url.searchParams.append("knowncode", req.body.matchToken);

    try {
        const response = await fetch(url.href, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            encoding: null
        });

        const json = await response.json();

        if (!json.result) {
            throw new Error("No results returned");
        }

        await admin.firestore().collection("authcodes").doc(uid).set({
            steamId: req.body.steamId,
            authCode: req.body.authCode,
            matchToken: req.body.matchToken
        });

        res.status(200).json(json)
    } catch (error) {
        return res.status(401).send(error.message)
    }
}
