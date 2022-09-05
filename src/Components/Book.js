import {useParams} from 'react-router-dom'

export default function Book(){
    const {id} = useParams()
    return(
        <div>
            <h2>Book {id}</h2>
        </div>
    )
}