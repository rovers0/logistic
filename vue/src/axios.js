/**
 * Created by Zura on 12/25/2021.
 */
import axios from "axios";
import store from "./store";
import router from "./router";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  withCredentials: false,
  headers: {
    Accept: '*',
  }
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config;
})

axiosClient.interceptors.response.use(response => {
  if(!response?.data?.success && response?.config?.method != 'get') {
    console.log(response)
    store.commit('showErrorModal', response?.data?.message);
  }
  return response;
  console.log(response.status);
  switch (response.status) {
    case '401':
      return 'response unauthorize';
    case '200': 
      return response;
  }

}, error => {
  if (error.response.status === 401) {
      sessionStorage.removeItem('TOKEN')
    router.push({name: 'Login'})
  } else if (error.response.status === 404) {
    router.push({name: 'NotFound'})
  }
  return Promise.reject(error);
})

export default axiosClient;
