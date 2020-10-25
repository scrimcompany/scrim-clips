import { useEffect, useState } from 'react';

import { Text, Image, HStack } from "@chakra-ui/core";

export default function ScoreboardPlayer({ steamId }) {
    const [player, setPlayer] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/fetchPlayerInfo?steamId=${steamId}`, { cache: "force-cache" });

            if (response.ok) {
                const player = await response.json()
                setPlayer(player);
            }
        })();
    }, [])

    const name = player && player.response && player.response.players[0].personaname;

    return (
        <HStack>
            <Image src={player && player.response && player.response.players[0].avatar} alt={name} borderRadius="3px" />
            <div>{name}</div>
        </HStack>
    )
}