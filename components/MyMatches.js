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
                Before we can generate your highlights, we'll need access to your match history so we can download your official matchmaking demos.
            </Text>
        )
    }

    const MatchCards = data.map(match => {
        return (<MatchCard key={match.id} {...match} user={user} />)
    });

    return (
        <>
            <Text fontSize="lg">Your match highlights, if you had any, will be sent to <code>{user.email}</code></Text>
            <Text fontSize="lg">If you have any feedback or questions, ask me on <Link href="https://discord.gg/hqwNJew" isExternal>Discord</Link>.</Text>
            <br />
            {MatchCards}
        </>
    )
}

export default MyMatches;