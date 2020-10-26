import { useState } from 'react';
import { useUser } from '../utils/auth/useUser'
import { useToast, Container, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, VStack, FormControl, FormLabel, Input, FormHelperText } from "@chakra-ui/core"

const AddMatchToken = () => {
    const { user } = useUser()

    const [matchToken, setMatchToken] = useState("");

    // Drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = React.useState("top")

    // Toast
    const toast = useToast();

    // Form
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const save = await fetch('/api/addMatch', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json', token: user && user.token }),
                credentials: 'same-origin',
                body: JSON.stringify({ matchToken })
            });

            if (!save.ok) {
                throw new Error("Please make sure you have correct inputs.")
            } else {
                toast({
                    position: "bottom",
                    title: "Success!",
                    description: "We'll generate clips for your future matches and matches played in the last 48 hours. You'll get an email if highlights were generated!",
                    status: "success",
                    duration: 10000,
                    isClosable: true,
                });
            }

            onClose();
        } catch (e) {
            toast({
                position: "bottom",
                title: "Unable to add match.",
                description: e.message,
                status: "error",
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme="green">
                Add matches manually
            </Button>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Manually add existing matches for clip generation</DrawerHeader>
                        <DrawerBody>
                            <Container>
                                <form onSubmit={handleSubmitForm}>
                                    <VStack spacing="1rem">
                                        <FormControl id="matchToken" isRequired>
                                            <FormLabel>Your match code</FormLabel>
                                            <Input type="text" placeholder="CSGO-jSmMh-AemvK-xpiXo-eFwWQ-ASfCG" value={matchToken} onChange={(event) => setMatchToken(event.target.value && event.target.value.trim())} />
                                        </FormControl>

                                        <Button colorScheme="green" type="submit">Submit</Button>
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

export default AddMatchToken;