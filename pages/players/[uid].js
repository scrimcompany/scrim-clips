export default function Player({ uid }) {
    return (
        <>Player {uid}</>
    )
}


export async function getServerSideProps({ params }) {
    return {
        props: {
            uid: params.uid
        }
    }
}