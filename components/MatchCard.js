import { Link, Button, Box, Spinner, Stack } from "@chakra-ui/core";

export default function MatchCard(props) {

    if (!props.demoUrl) {
        return (
            <Box bg="gray.50" p={4} m={1}>
                <Stack direction="row" spacing={4} alignItems="center">
                    <Spinner size="xs" />
                    <div>Processing match {props.id}</div>
                </Stack>
            </Box>
        )
    }

    return (
        <Box bg="gray.50" p={4} m={1}>
            <div>Match {props.id}</div>
            <div><Link href={props.demoUrl}><Button size="sm">Download demo</Button></Link></div>
            {/* <div>Added {new Date(props.created).getTime()}</div> */}
            <div>{props.players}</div>
            <div>{props.kills}</div>
            <div>{props.hs}</div>
            <div>{props.assists}</div>
            <div>{props.deaths}</div>
            <div>{props.scores}</div>
            <div>{props.mvps}</div>
            {/* <div>{props.duration}</div> */}
            <div>{props.team_scores.join(" - ")}</div>
        </Box>
    )
}