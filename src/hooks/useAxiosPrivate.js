import { privateAxios } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useauth'

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth } = useAuth()


    useEffect(() => {
        //Request Interceptors
        const requestIntercept = privateAxios.interceptors.request.use(config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`
            }
            return config;
        }, (error) => Promise.reject(error));


        //Response interceptors
        const responseIntercept = privateAxios.interceptors.response.use(response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    
                    console.log('trying to get refresh token');
                    const newAccessToken = await refresh();

                    console.log('i got  the  refresh');
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return privateAxios(prevRequest)
                }
                return Promise.reject(error)
            });

        return () => {
            privateAxios.interceptors.response.eject(responseIntercept)
            privateAxios.interceptors.request.eject(requestIntercept)
        }

    }, [auth, refresh])



    return privateAxios;
}

export default useAxiosPrivate