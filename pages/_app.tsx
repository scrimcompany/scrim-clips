// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
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

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <FuegoProvider fuego={fuego}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </FuegoProvider>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp