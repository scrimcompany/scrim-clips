import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Heading, Container, UnorderedList, ListItem } from "@chakra-ui/core"

export default function FAQ() {
    return (
        <>
            <Container>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Why do you need to access my match history?
                        </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            We need access to your match history so we can download your official matchmaking demos. We generate your highlights from your demo. In order for us to know which matches you played, like csgostats.gg, we'll need access to your match history.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Where do my highlights show up?
                        </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            We'll send an email to you after your highlights have been generated. You'll be able to stream or download these clips.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                How are highlights generated?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            At the end of your match, we'll analyze your game and determine which kills are worth clipping. We automate the task of recording your highlights from the demo. Video clips are generated on our own machines and we'll upload them to the cloud for you to download and enjoy.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                What gets highlighted?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            {/* The following events that happen within a single round are considered significant and will generate a highlight: */}

                            <UnorderedList>
                                <ListItem>5K</ListItem>
                                <ListItem>4K</ListItem>
                                <ListItem>3K if they are within 6 seconds* apart from each other</ListItem>
                                <ListItem>2K if they are within 1 seconds* apart from each other</ListItem>
                                <ListItem>Knife/taser kills</ListItem>
                                <ListItem>No scopes with AWP and Scout</ListItem>
                                <ListItem>Mid-air kills</ListItem>
                                <ListItem>Any combination of thru-smoke, blind, and penetration kill</ListItem>
                            </UnorderedList>
                            <br />
                            * = subject to change
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                I didn't receive an email after my match ended
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            Usually this happens because you didn't have any highlights for that match – refer to "What gets highlighted".
                            <br />
                            <br />
                            In general, expect an email within 10 minutes after your game. Please note that processing demos and recording clips take time depending on how many demos are in queue.
                            <br />
                            <br />
                            If you believe that there's a mistake, please let me know and I'll look into it. The least I can do is re-process the match for you.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
        </>
    )
}