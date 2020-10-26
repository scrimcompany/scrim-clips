import NextLink from 'next/link'
import { useUser } from '../utils/auth/useUser'
import { Button, Center, VStack, Wrap, Heading, } from "@chakra-ui/core"
import MyMatches from './../components/MyMatches';
import MyAPISecrets from './../components/MyAPISecrets';
import AddMatchToken from './../components/AddMatchToken';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <>
        <Center bg="black" minH="100vh" color="white">
          <VStack>
            <Heading textAlign="center" pb={8}>Get your CS:GO frag highlights via email</Heading>
            <NextLink href={'/auth'} passHref>
              <Button colorScheme="purple" size="lg">Sign in</Button>
            </NextLink>
          </VStack>
        </Center>
      </>
    )
  } else {
    return (
      <>
        <Center>
          <Wrap p={4}>
            <MyAPISecrets />
            <AddMatchToken />

            <Button
              onClick={() => logout()}
            >Log out</Button>
          </Wrap>
        </Center>

        { user && <MyMatches user={user} />}
      </>
    )
  }
}

export default Index