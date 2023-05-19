import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3005",
  headers: { access_token: localStorage.getItem("access_token") },
});
http.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["access_token"] = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Mengelola respons yang berhasil
    return response;
  },
  function (error) {
    // Mengelola kesalahan respons
    return Promise.reject(error);
  }
);

export default http;
