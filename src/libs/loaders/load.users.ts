import api from "../axios/axios";
import {AxiosResponse} from "axios";


const loadUsers = (type: string): Promise<AxiosResponse<UserObj[]>> => {
    return new Promise((resolve, reject) => {
        api.get(`/app/${type}`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
export default loadUsers;

