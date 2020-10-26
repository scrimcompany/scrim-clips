import { Spinner } from "@chakra-ui/core";

import MatchCard from './MatchCard';

import { useCollection } from '@nandorojo/swr-firestore'

const MyMatches = ({ user }) => {
    const { data, update, error } = useCollection("matches", { where: ['requestBy', 'array-contains', user && user.id], listen: true, orderBy: ['created', 'desc'], })

    if (error) {
        console.log(error);
        return (<div>Failed to fetch matches!</div>);
    }
    if (!data && !error) return (
        <Spinner m={2} />
    );

    return (
        <div>
            {
                data &&
                data.length === 0 &&
                "Please set auth codes so we can access your match history."
            }
            {
                data &&
                data.length > 0 &&
                data.map(match => {
                    return (<MatchCard key={match.id} {...match} user={user} />)
                })
            }
        </div>
    )
}

export default MyMatches;