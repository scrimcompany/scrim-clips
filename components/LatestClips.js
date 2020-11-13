import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Heading, SimpleGrid, Container } from "@chakra-ui/core";



export default function Scoreboard() {
    const [clips, setClips] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/latestClips`, { cache: "force-cache" });

            if (response.ok) {
                const clips = await response.json()
                setClips(clips);
            }
        })();
    }, [])

    const videoStyle = {
        width: "100%"
    };

    return (
        <Container maxW="lg">
            <Heading padding={4} size="lg" color="white">Latest Clips</Heading>
            <SimpleGrid columns={2} spacing={10} padding={4}>
                {
                    clips &&
                    Object
                        .values(clips)
                        .map(clips =>
                            Object
                                .values(clips.data).map(url => <video
                                    style={videoStyle}
                                    src={url}
                                    type="video/mp4"
                                    controls
                                    preload="metadata"
                                />)
                        )
                }
            </SimpleGrid>
        </Container>
    )
}