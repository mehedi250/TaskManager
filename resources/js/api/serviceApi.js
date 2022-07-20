import { sendRequest } from "./rootApi";
const rootURL = 'http://127.0.0.1:8000/api/';

export const getProjectListApi = async () => {
    return sendRequest("get", rootURL+'projects', []);
}

export const createProjectApi = async (payload) => {
    return sendRequest("post", rootURL+'projects', payload);
}