import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { VStack, Center } from "@chakra-ui/core";

const URL = "/api/getClipsForPlayer"

export default function Match({ steamId, initialData }) {
    if (!steamId) {
        return <Center h="100vh">No clips for specified player</Center>
    }

    const { data, error } = useSWR(URL + `?steamId=${steamId}`, fetcher, initialData)
    if (error) {
        return <Center h="100vh">{JSON.stringify(error)}</Center>
    }

    const clips = data && Object.keys(data).map(round => data[round]);
    console.log(clips);

    if (clips && clips.length === 0) {
        return <Center h="100vh">Player does not have any clips</Center>
    }

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
    const { steamId } = query;

    if (!steamId) {
        return {
            props: {
                steamId: null,
                initialData: null
            }
        }
    }

    const dev = process.env.NODE_ENV !== 'production';
    const data = await fetcher((dev ? 'http://localhost:3000' : 'https://clips.scrim.app') + URL + `?steamId=${steamId}`)

    return {
        props: {
            steamId,
            initialData: data
        }
    }
}
