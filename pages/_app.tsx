import '../styles.css'

import type { AppProps } from 'next/app'

import { ChakraProvider } from "@chakra-ui/core"

import 'firebase/firestore'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const fuego = new Fuego(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <FuegoProvider fuego={fuego}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </FuegoProvider>
        </>
    )
}