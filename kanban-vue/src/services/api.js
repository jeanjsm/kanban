import axios from "axios";
import store from "../store";

const config = {
  baseURL: "http://localhost:3333"
};

const api = axios.create(config);

api.interceptors.request.use(
  conf => {
    store.commit("app/setLoading", true);
    const auth_data = JSON.parse(localStorage.getItem("auth_data"));

    if (auth_data) {
      conf.headers["Authorization"] = `Bearer ${auth_data.token}`;
    }
    return Promise.resolve(conf);
  },
  error => {
    store.commit("app/setLoading", false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  conf => {
    store.commit("app/setLoading", false);
    return Promise.resolve(conf);
  },
  error => {
    // const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.response.data &&
      error.response.data.error === "invalid_token"
    ) {
      store.commit("app/setLoading", false);
      return Promise.reject(error);
    } else {
      store.commit("app/setLoading", false);
      return Promise.reject(error);
    }
  }
);

// api.interceptors.request.use(config => {
//   store.commit('app/setLoading', true);
//   const token = JSON.parse(localStorage.getItem("auth_data")).token;
//   if (token) {
//     config.headers['Authorization'] = 'Bearer ' + token;
//   }
//   return config;
// }, error => {
//   store.commit('app/setLoading', false);
//   Promise.reject(error);
// });

// api.interceptors.response.use((response) => {
//   store.commit('app/setLoading', false);
//   return response;
// }, function(error) {
//   const originalRequest = error.config;
//   if (error.response.status == 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     return Promise.reject(error);
//   } else {
//     store.commit('app/setLoading', false);
//     return Promise.reject(error);
//   }
// })

export default api;
