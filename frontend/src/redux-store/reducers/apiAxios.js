import axios from "axios";

const SERVICE_URL_PREFIX = "http://localhost:3000/api/v1";

const API = axios.create({
  baseURL: SERVICE_URL_PREFIX,
  timeout: 30000,
  headers: {},
});

API.interceptors.response.use(function (response) {
  console.log("response.data?.isError", response.data?.isError);
  if (response.data?.isError) {
    throw response.data;
  }
  return response;
});

export default API;
