import NextLink from 'next/link'
import AddMatchToken from './../components/AddMatchToken';
import FAQ from './../components/FAQ';
import MyMatches from './../components/MyMatches';
import MyAPISecrets from './../components/MyAPISecrets';
import { useUser } from '../utils/auth/useUser'
import { Box, Button, Center, Stack, VStack, Wrap, Heading, Link, Text } from "@chakra-ui/core"

const Index = () => {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <Box>
        <Center minH="100vh" bg="gray.800" >
          <VStack spacing={4}>
            <Heading size="xl" color="white">Get your CS:GO match highlights via email</Heading>
            <Text color="gray.400">After each matchmaking game, we'll send video clips to your email!</Text>
            <NextLink href={'/auth'} passHref>
              <Button colorScheme="purple" size="lg" spacing={2}>Sign in</Button>
            </NextLink>
            <br />
            <Text color="gray.500" fontSize="sm">Built by <Link href="https://twitter.com/junpnw" isExternal>@junpnw</Link></Text>
          </VStack>
        </Center>
      </Box >
    )
  } else {
    return (
      <Stack spacing="1rem" m={4}>
        <Wrap>
          <MyAPISecrets />
          {/* <AddMatchToken /> */}

          <Button
            onClick={() => logout()}
          >Log out</Button>
        </Wrap>

        <p>
          <Text>Your match highlights, if you had any, will be sent to <code>{user.email}</code></Text>
          <Text>If you have any feedback or questions, ask me on <Link href="https://discord.gg/hqwNJew" isExternal>Discord</Link> or on Twitter <Link href="https://twitter.com/junpnw" isExternal>@junpnw</Link></Text>
        </p>

        <Heading size="md">Frequently asked questions</Heading>
        <FAQ />

        <Heading size="md">Your matches</Heading>
        <Box>{user && <MyMatches user={user} />}</Box>
      </Stack>
    )
  }
}

export default Index