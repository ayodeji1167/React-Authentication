import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export default function User() {
    const [users, setUsers] = useState()
    const navigate = useNavigate()
    const location = useLocation();


    const privateAxios = useAxiosPrivate()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()
       

        const getUser = async () => {
            try {
                console.log('tried to fetch');
                const response = await privateAxios.get('/user/all')
        
                isMounted && setUsers(response.data)
            } catch (error) {
                // This error can be due to the refresh token being expired in the await above...cos we're using refresh token to get access token to send the request
                // If it happens, navigate user back to login so it will generate e new Refresh token
                console.log(location);
                console.error(error);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUser()

        return()=>{
            isMounted = false;
        }

    }, [])


    return (
        <article>
            <h1>List of Users</h1>

            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.userName}</li>)}
                    </ul>
                )
                : <p>There is no user</p>
            }
        </article>
    )
}
