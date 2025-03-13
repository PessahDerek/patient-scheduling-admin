import axios from "axios";
import authStore from "../../stores/authStore";


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

/** Set request headers with every request */
api.interceptors.request.use(config => {
    // const token = localStorage.getItem("token")
    const local = sessionStorage.getItem("auth-store")
    const token = local ? JSON.parse(local).state['token'] : null
    if (token)
        config.headers.Authorization = "Bearer " + token
    return config
})

// TODO: Work on automatic logging out
api.interceptors.response.use(res => res, err => {
    if (err.status === 401) {
        authStore.getState().logOut()
        // throw new TokenExpired()
    }
    return Promise.reject(err)
})


export default api
