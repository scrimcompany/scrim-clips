import useSWR from 'swr'
import { useUser } from '../utils/auth/useUser'

import { Spinner } from "@chakra-ui/core"

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

    if (error) return (<div>Failed to fetch matches!</div>);
    if (!data && !error) return (<Spinner />);

    return (
        <div>
            {
                data.matches.map(match => {
                    return (<div key={match.id}>{match.id} {match.demoUrl} {new Date(match.created).getTime()}</div>)
                })
            }
        </div>
    )
}

export default MyMatches;