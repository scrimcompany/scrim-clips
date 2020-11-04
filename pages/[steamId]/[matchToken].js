import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { VStack, Center, Container } from "@chakra-ui/core";

const URL = "/api/getClipsForPlayer"

export default function Match({ steamId, matchToken, initialData }) {
    if (!steamId) {
        return <Center h="100vh">Please specify a steamId</Center>
    }

    if (!matchToken) {
        return <Center h="100vh">Please specify a match token</Center>
    }

    const { data, error } = useSWR(URL + `?steamId=${steamId}&matchToken=${matchToken}`, fetcher, initialData)

    if (error) {
        return <Center h="100vh">{JSON.stringify(error)}</Center>
    }

    if (data && data.length === 0) {
        return <Center h="100vh">No clips found</Center>
    }

    const clips = data && data[0] && data[0].data && Object.values(data[0].data);

    const videoStyle = {
        width: "100%"
    };

    return (
        <Container maxW="xl">
            <VStack>
                {
                    clips && clips.map(clip => {
                        return (
                            <div key={clip} style={videoStyle}>
                                <video
                                    style={videoStyle}
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
        </Container>
    )
}

export async function getServerSideProps({ params }) {
    const { steamId, matchToken } = params;

    if (!steamId && !matchToken) {
        return {
            props: {
                steamId: null,
                matchToken: null,
                initialData: null
            }
        }
    }

    const dev = process.env.NODE_ENV !== 'production';
    const data = await fetcher((dev ? 'http://localhost:3000' : 'https://clips.scrim.app') + URL + `?steamId=${steamId}&matchToken=${matchToken}`)

    return {
        props: {
            steamId,
            matchToken,
            initialData: data
        }
    }
}
