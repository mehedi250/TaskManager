import { sendRequest } from "./rootApi";

export const getProjectListApi = async () => {
    return sendRequest("get", baseUrl+'projects', []);
}

export const createProjectApi = async (payload) => {
    return sendRequest("post", baseUrl+'projects', payload);
}

export const getProjectApi = async (id) => {
    return sendRequest("get", baseUrl+`projects/${id}`, []);
}