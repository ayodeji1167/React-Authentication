import { useState, useEffect } from "react";
import { useLocation, Navigate, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useauth";
import axios from "../api/axios";



export default function Login() {
    const { setAuth, auth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    //To get the path where  the user is from
    const from = location.state?.from?.pathname || '/'

    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [errmsg, setErrMessage] = useState('');


    //Set error message to true for every input cos the user has seen it
    useEffect(() => setErrMessage(''), [userName, password])


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/user/login', JSON.stringify({ userName, password }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data)
            const accessToken = response?.data?.acessToken;
            const roles = response?.data?.roles;

            setAuth({ userName, roles, accessToken })
            navigate(from, { replace: true })
        } catch (error) {
            if (!error?.response) {
                setErrMessage('No server response')
            }
            else if (error.response.status === 400) {
                setErrMessage('Missing Username Or Password')
            }
            else if (error.response.status === 401) {
                setErrMessage('Invalid Username Or Password')
            }
            else {
                setErrMessage('Login Failed')
            }
        }

    }
    return (
        <section>
            <p className={errmsg ? 'errmsg' : 'offscreen'}>
                {errmsg}
            </p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    autoComplete="off"
                    type='text'
                    id="username"
                    required
                    name='userName'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type='password'
                    required
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button >Sing In</button>
                <p>
                    Already Registered? <br />
                    <span className='line'>
                        {/**Put a router link here */}
                        <a href='#'>Sign In</a>
                    </span>
                </p>
            </form>
        </section >

    )
}