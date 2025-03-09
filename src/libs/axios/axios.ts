import axios from "axios";
import {TokenExpired} from "../instances/classes";


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

/** Set request headers with every request */
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token)
        config.headers.Authorization = "Bearer " + token
    return config
})

// TODO: Work on automatic logging out
api.interceptors.response.use(res => res, err => {
    if (err.status === 401) {
        throw new TokenExpired()
    }
    throw err
})


export default api
