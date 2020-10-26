import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

import { VStack, Center } from "@chakra-ui/core";

const URL = "/api/getClips"

export default function Match({ matchToken, steamId, initialData }) {
    if (!matchToken) {
        return <Center h="100vh">Match not found</Center>
    }

    if (!steamId) {
        return <Center h="100vh">No clips for specified player</Center>
    }

    const { data, error } = useSWR(URL + `?matchToken=${matchToken}&steamId=${steamId}`, fetcher, initialData)
    const clips = data && Object.keys(data).map(round => data[round]);
    console.log(clips);

    return (
        <VStack>
            {
                clips && clips.map(clip => {
                    return (
                        <div key={clip}>
                            <video
                                width="100%"
                                src={clip}
                                type="video/mp4"
                                controls
                                preload="metadata"
                            />
                        </div>
                    )
                })
            }
        </VStack>
    )
}

export async function getServerSideProps({ params, query }) {
    const { matchToken } = params;
    const { steamId } = query;

    if (!matchToken || !steamId) {
        return {
            props: {
                matchToken: null,
                steamId: null,
                initialData: null
            }
        }
    }

    const dev = process.env.NODE_ENV !== 'production';
    const data = await fetcher((dev ? 'http://localhost:3000' : 'https://clips.scrim.app') + URL + `?matchToken=${matchToken}&steamId=${steamId}`)

    return {
        props: {
            matchToken,
            steamId,
            initialData: data
        }
    }
}
