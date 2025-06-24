import axios from "axios";
import { store } from '../redux/store';
import { METHODS } from "../constant";


const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
});
// In api/index.jsx
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state?.users?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error cases
        if (error.response?.status === 401) {
            // Handle unauthorized access
            store.dispatch({ type: 'users/logout' });
        }
        return Promise.reject(error);
    }
);

const client = ({ method = METHODS.GET, url = '', withCredentials = false, auth, data, ...otherParams }) => {
    return api({
        method,
        url,
        withCredentials,
        auth,
        data,
        ...otherParams
    });
}

export default client;