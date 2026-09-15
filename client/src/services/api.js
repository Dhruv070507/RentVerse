// for making api calls to the backend

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});


// Interceptor to add the access token to the request headers
// An interceptor is a function that is called before a request is sent or after a response is received. It allows you to modify the request or response before it is handled by the application. 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;