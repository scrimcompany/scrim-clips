import useSWR from 'swr'
import { useUser } from '../utils/auth/useUser'

const fetcher = (url, token) =>
    fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin',
    }).then((res) => res.json())

const MyMatches = () => {
    const { user } = useUser()

    const { data, error } = useSWR(
        user ? ['/api/getMyMatches', user.token] : null,
        fetcher
    )

    return (
        <>
            {error && <div>Failed to fetch matches!</div>}
            {data && !error ? (
                <div>{JSON.stringify(data)}</div>
            ) : (
                    <div>Loading...</div>
                )}
        </>
    )
}

export default MyMatches;