import { sendRequest } from "./rootApi";

export const checkIfAuthenticated = () =>{
    const data = localStorage.getItem('loginData');
    if(data != null){
        const authData = JSON.parse(data);
        if(authData.data.success && authData.data.accessToken !== null){
            return authData.data.user;
        }
        return false;
    }
    return false;
}

export const loginApi = async (payload) => {
    return sendRequest("post", baseUrl+'auth/login', payload);
}

export const registerApi = async (payload) => {
    return sendRequest("post", baseUrl+'auth/register', payload);
}

export const getUserApi = async () =>{
    return sendRequest("post", baseUrl+'auth/user', []);
}