import axios from "axios";

export const sendRequest = (method, url, payload = []) => {
    let data = [];
    data = payload;
   
    return axios.request({
        method: method,
        url: url,
        data: data
    });
}