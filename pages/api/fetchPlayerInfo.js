const fetchPlayerInfo = async (req, res) => {
    const url = new URL("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002");
    url.searchParams.append("key", process.env.STEAM_WEB_API_KEY);
    url.searchParams.append("steamids", req.query.steamId);

    try {
        const response = await fetch(url.href, {
            method: 'GET',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            encoding: null
        });

        const json = await response.json();

        res.setHeader("Cache-Control", "public,max-age=31536000,immutable");

        return res.status(200).json(json);
    } catch (error) {
        return res.status(401).send('Something went wrong')
    }
}

export default fetchPlayerInfo
