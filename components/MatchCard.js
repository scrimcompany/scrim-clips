import { Text, Link, Button, Box, Spinner, Stack, useToast } from "@chakra-ui/core";
import Scoreboard from './Scoreboard';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function MatchCard(props) {
    const toast = useToast();

    const generateHighlights = async (matchId, demoUrl, uid) => {
        const alreadyGeneratedForUser = false && props.generatedFor && props.generatedFor.indexOf(uid) > -1;

        if (alreadyGeneratedForUser) {
            toast({
                position: "bottom",
                title: "Clips already exist",
                description: "Looks like we already generated clips for this match.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        const response = await fetch('/api/generateHighlights', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json', token: props.user && props.user.token }),
            credentials: 'same-origin',
            body: JSON.stringify({ matchId, demoUrl, uid })
        });

        if (response.ok) {
            toast({
                position: "bottom",
                title: "Highlights to be generated!",
                description: "Your match was added to the processing queue.",
                status: "success",
                isClosable: true,
            });
        } else {
            toast({
                position: "bottom",
                title: "Something went wrong",
                description: "Unable to generate highlights.",
                status: "error",
                isClosable: true,
            });
        }
    }

    if (!props.demoUrl) {
        return (
            <Stack direction="row" spacing={4} alignItems="center">
                <Spinner size="xs" />
                <div>Fetching match {props.id}</div>
            </Stack>
        )
    }

    const alreadyGenerated = props.generatedFor && props.generatedFor.indexOf(props.user.id) > -1;

    // const highlightsLink = `/m/${props.id}?steamId=`

    return (
        <Stack spacing={2}>
            {
                alreadyGenerated ?
                    (<>Match {props.id} from {dayjs(props.matchtime * 1000).fromNow()} Processed ✅</>) :
                    (<>Match {props.id} from {dayjs(props.matchtime * 1000).fromNow()} To Be Processed ⌛</>)
            }

            {
                false &&
                process.env.NODE_ENV !== "production" &&
                (<Button colorScheme="purple" onClick={() => generateHighlights(props.id, props.demoUrl, props.user.id)}>Generate my highlights</Button>)
            }

            {/* <Scoreboard {...props}></Scoreboard> */}
        </Stack >
    )
}