import FirebaseAuth from '../components/FirebaseAuth'
import { Center, Container } from "@chakra-ui/core"

const Auth = () => {
  return (
    <>
      <Center h="100vh" bg="gray.700">
        <Container>
          <FirebaseAuth />
        </Container>
      </Center>
    </>
  )
}

export default Auth
