export default function Player({ matchToken }) {
    return (
        <>Match {matchToken}</>
    )
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            matchToken: params.matchToken
        }
    }
}