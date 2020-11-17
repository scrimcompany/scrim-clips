import NextLink from 'next/link'
import { useUser } from '../utils/auth/useUser'
import { Box, Button, Center, Stack, VStack, Wrap, Heading, Link, Text } from "@chakra-ui/core"
import MyMatches from './../components/MyMatches';
import MyAPISecrets from './../components/MyAPISecrets';

const Index = () => {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <Box>
        <Center minH="100vh" bg="gray.700" >
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
      </Box>
    )
  } else {
    return (
      <Stack spacing="1rem" m={4}>
        <Wrap>
          <MyAPISecrets />

          <Button
            onClick={() => logout()}
          >Log out</Button>
        </Wrap>

        <Box>{user && <MyMatches user={user} />}</Box>
      </Stack>
    )
  }
}

export default Index