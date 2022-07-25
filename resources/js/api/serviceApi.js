import { sendRequest } from "./rootApi";

export const getProjectListApi = async () => {
    return sendRequest("get", baseUrl+'projects', []);
}

export const createProjectApi = async (payload) => {
    return sendRequest("post", baseUrl+'projects', payload);
}

export const updateProjectApi = async (id, payload) => {
    return sendRequest("put", baseUrl+`projects/${id}`, payload);
}

export const getProjectApi = async (id) => {
    return sendRequest("get", baseUrl+`projects/${id}`, []);
}

export const deleteProjectApi = async (id) => {
    return sendRequest("delete", baseUrl+`projects/${id}`, []);
}

export const createTaskApi = async (payload) => {
    return sendRequest("post", baseUrl+'tasks', payload);
}

export const deleteTaskApi = async (id) => {
    return sendRequest("delete", baseUrl+`tasks/${id}`, []);
}

export const updateTaskApi = async (id, payload) => {
    return sendRequest("put", baseUrl+`tasks/${id}`, payload);
}
