import { sendRequest } from "./rootApi";


export const loginApi = async (payload) => {
    return sendRequest("post", baseUrl+'auth/login', payload);
}

export const registerApi = async (payload) => {
    return sendRequest("post", baseUrl+'auth/register', payload);
}