import NextLink from 'next/link'
import { useUser } from '../utils/auth/useUser'
import { Button, Center, VStack, HStack, Heading, } from "@chakra-ui/core"
import MyMatches from './../components/MyMatches';
import MyAPISecrets from './../components/MyAPISecrets';

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = ({ matches }) => {
  const { user, logout } = useUser()

  if (!user) {
    return (
      <>
        <Center bg="gray.200" minH="50vh" color="white">
          <VStack>
            <Heading textAlign="center">Get frag highlights for CS:GO</Heading>
            <NextLink href={'/auth'} passHref>
              <Button>Sign in</Button>
            </NextLink>
          </VStack>
        </Center >

        {JSON.stringify(matches)}
      </>
    )
  } else {
    return (
      <div>

        <HStack><MyAPISecrets />

          <Button
            onClick={() => logout()}
          >Log out</Button></HStack>

        <MyMatches />
      </div>
    )
  }
}

export default Index


export async function getServerSideProps({ req }) {
  // `getStaticProps` is invoked on the server-side,
  // so this `fetcher` function will be executed on the server-side.
  const dev = process.env.NODE_ENV !== 'production';
  const data = await fetcher((dev ? 'http://localhost:3000' : 'https://clips.scrim.app') + '/api/listMatches')

  return { props: { matches: data && data.matches } }
}