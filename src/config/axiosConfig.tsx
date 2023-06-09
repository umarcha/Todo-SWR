import axios from "axios";

// const apiEndpoint = "http://localhost:3000/"
const apiEndpoint = "https://todo-backend.cyclic.app/"

const axiosClient = axios.create();

axiosClient.defaults.baseURL = apiEndpoint;

axiosClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export async function getRequest(URL: string) {
  return axiosClient.get(`/${URL}`).then((response) => response.data);
}

export async function postRequest(URL: string, payload: unknown) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response.data);
}

export async function patchRequest(URL: string, payload: unknown) {
  return axiosClient
    .patch(`/${URL}`, payload)
    .then((response) => response.data);
}

export async function putRequest(URL: string, payload: unknown) {
  return axiosClient
    .put(`/${URL}`, payload)
    .then((response) => response.data);
}

export async function deleteRequest(URL: string) {
  return axiosClient.delete(`/${URL}`).then((response) => response.data);
}
