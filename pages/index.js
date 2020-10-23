import { useEffect, useState } from 'react'
import useSWR from 'swr'
import NextLink from 'next/link'
import { useUser } from '../utils/auth/useUser'

import { Button } from "@chakra-ui/core"
import { Link } from "@chakra-ui/core"

import firebase from 'firebase/app'
import 'firebase/firestore'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())



const Index = () => {
  const { user, logout } = useUser()
  const { data, error } = useSWR(
    user ? ['/api/getFood', user.token] : null,
    fetcher
  )

  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{' '}
          <NextLink href={'/auth'} passHref>
            <Button>Sign in</Button>
          </NextLink>
        </p>
      </>
    )
  }

  return (
    <div>
      <div>
        <p>You're signed in. Email: {user.email}</p>
        <Button
          onClick={() => logout()}
        >
          Log out
        </Button>
      </div>
      <div>
        <NextLink href={'/example'} passHref>
          <Link>Another example page</Link>
        </NextLink>
      </div>
      {error && <div>Failed to fetch food!</div>}
      {data && !error ? (
        <div>Your favorite food is {data.food}.</div>
      ) : (
          <div>Loading...</div>
        )}
    </div>
  )
}

export default Index
