import { Text, Spinner, Link } from "@chakra-ui/core";

import MatchCard from './MatchCard';

import { useCollection } from '@nandorojo/swr-firestore'

const MyMatches = ({ user }) => {
    const { data, error } = useCollection("matches", { where: ['requestBy', 'array-contains', user && user.id], listen: true, orderBy: ['matchtime', 'desc'], })

    if (error) {
        console.log(error);
        return (<>Failed to fetch matches!</>);
    }
    if (!data && !error) return (
        <Spinner m={2} />
    );

    if (data && data.length === 0) {
        return (
            <Text>
                Please set your match history auth code.
            </Text>
        )
    }

    const MatchCards = data.map(match => {
        return (<MatchCard key={match.id} {...match} user={user} />)
    });

    return (
        <>
            {MatchCards}
        </>
    )
}

export default MyMatches;