import axios from "axios";

export const getAccessToken = () =>{
    const data = localStorage.getItem('loginData');
    if(data != null){
        const authData = JSON.parse(data);
        if(authData.data.success && authData.data.accessToken !== null){
            return 'Bearer ' + authData.data.accessToken;
        }
        return false;
    }
    return false;
}
export const sendRequest = (method, url, payload = []) => {
    let data = [];
    data = payload;
    
    return axios.request({
        method: method,
        url: url,
        data: data,
        headers: { Authorization: getAccessToken()}
    });
}