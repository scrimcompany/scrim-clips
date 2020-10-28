import { Spinner, Center } from "@chakra-ui/core";

import MatchCard from './MatchCard';

import { useCollection } from '@nandorojo/swr-firestore'

const MyMatches = ({ user }) => {
    const { data, error } = useCollection("matches", { where: ['requestBy', 'array-contains', user && user.id], listen: true, orderBy: ['matchtime', 'desc'], })

    if (error) {
        console.log(error);
        return (<Center>Failed to fetch matches!</Center>);
    }
    if (!data && !error) return (
        <Center><Spinner m={2} /></Center>
    );

    return (
        <div>
            {
                data &&
                data.length === 0 &&
                <Center textAlign="center">
                    In order for us to generate highlights for your official valve matchmaking matches,<br />please set your autentication code so we can access your match history.
                </Center>
            }
            {
                data &&
                data.length > 0 &&
                <>
                    <Center textAlign="center" fontWeight="bold" py={2}>That's it! Nothing further to do, go play MM. Your match highlights, if you had any, will be sent to {user.email}.</Center>
                    <Center textAlign="center">Showing your match history.</Center>
                </>
            }
            {
                data &&
                data.length > 0 &&
                data.map(match => {
                    return (<MatchCard key={match.id} {...match} user={user} />)
                })
            }
        </div >
    )
}

export default MyMatches;