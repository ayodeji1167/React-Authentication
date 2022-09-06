import axios from '../api/axios';
import useAuth from './useauth'


export default function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log('Im in the get refresh method');
        const response = await axios.get('/user/refresh', {withCredentials:true});

        console.log(response);
        setAuth(prevAuth=>{
            console.log(JSON.stringify(prevAuth));
            console.log(response?.data?.acessToken);
          return  {...prevAuth, acessToken:response.data.acessToken}
        })
        return response.data.acessToken;
    }

    return refresh
}
