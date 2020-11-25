import { useEffect } from 'react';
import { useUser } from '../utils/auth/useUser'
import { Text, useToast, Link, Container, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, VStack, FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/core"

const MyAPISecrets = () => {
    const { user } = useUser()

    useEffect(() => {
        const token = user && user.token;
        if (token) {
            fetch('/api/getMatchAuthCode', {
                method: 'GET',
                headers: new Headers({ 'Content-Type': 'application/json', token })
            }).then(async res => {
                if (res.ok) {
                    const codes = await res.json()
                    setSteamId(codes.steamId);
                    setAuthCode(codes.authCode);
                    setMatchToken(codes.matchToken);
                }
            });
        }
    }, [user]);

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState("top")

    // Toast
    const toast = useToast();

    // Match History
    const [steamId, setSteamId] = React.useState("")
    const [authCode, setAuthCode] = React.useState("")
    const [matchToken, setMatchToken] = React.useState("")

    // Form
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const save = await fetch('/api/saveMatchAuthCode', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json', token: user && user.token }),
                credentials: 'same-origin',
                body: JSON.stringify({ steamId, authCode, matchToken })
            });

            if (!save.ok) {
                throw new Error("Please make sure you have correct inputs.")
            } else {
                toast({
                    position: "bottom",
                    title: "Success!",
                    description: "We'll generate clips for matches played in the last 48 hours and all future matches. FYI, you'll get an email if and only if highlights were generated!",
                    status: "success",
                    duration: 10000,
                    isClosable: true,
                });

                fetch('/api/fetchMatches', {
                    method: 'GET'
                });
            }

            onClose();
        } catch (e) {
            toast({
                position: "bottom",
                title: "Unable to fetch match history. Make sure the steamID64 is for the correct account.",
                description: e.message,
                status: "error",
                isClosable: true,
            });
        }
    }

    return (
        <>
            {
                matchToken && authCode ?
                    <Button onClick={onOpen}>Update match history auth code</Button> :
                    <Button onClick={onOpen} colorScheme="purple">Set match history auth code</Button>
            }

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Match History Authentication Code</DrawerHeader>
                        <DrawerBody>
                            <Container>
                                <Text py={4}>We will use your authentication code to access your match history and download replays of your matches.</Text>
                                <form onSubmit={handleSubmitForm}>
                                    <VStack spacing="1rem">
                                        <FormControl id="steamId" isRequired>
                                            <FormLabel>Your SteamID64</FormLabel>
                                            <Input type="text" placeholder="76561197961790405" value={steamId} onChange={(event) => setSteamId(event.target.value && event.target.value.trim())} />
                                            <FormHelperText><Link isExternal href="https://steamid.io/">Find your steamID64</Link></FormHelperText>
                                        </FormControl>
                                        <FormControl id="authCode" isRequired>
                                            <FormLabel>Authentication Code</FormLabel>
                                            <Input type="text" placeholder="9KSN-9L2H7-P5HX" value={authCode} onChange={(event) => setAuthCode(event.target.value && event.target.value.trim())} />
                                            <FormHelperText><Link isExternal href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128">Find your Match History Authentication Code</Link></FormHelperText>
                                        </FormControl>
                                        <FormControl id="matchToken" isRequired>
                                            <FormLabel>Match Token</FormLabel>
                                            <Input type="text" placeholder="CSGO-jSmMh-AemvK-xpiXo-eFwWQ-ASfCG" value={matchToken} onChange={(event) => setMatchToken(event.target.value && event.target.value.trim())} />
                                            <FormHelperText><Link isExternal href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128">Find your your most recently completed match token</Link></FormHelperText>
                                        </FormControl>

                                        <Button colorScheme="purple" type="submit">Save</Button>
                                    </VStack>
                                </form>
                            </Container>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default MyAPISecrets;