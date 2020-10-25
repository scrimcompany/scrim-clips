import FirebaseAuth from '../components/FirebaseAuth'
import { Center, Container } from "@chakra-ui/core"

const Auth = () => {
  return (
    <>
      <Center bg="tomato" h="100vh" color="white">
        <Container>
          <FirebaseAuth />
        </Container>
      </Center>
    </>
  )
}

export default Auth
