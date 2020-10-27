import { useCollection } from '@nandorojo/swr-firestore'

const Example = (props) => {
    const { data, error } = useCollection(`match_processed`, { orderBy: ['created', 'desc'], listen: true });

    return (
        <div>

            {JSON.stringify(data)}

        </div>
    )
}

export default Example
