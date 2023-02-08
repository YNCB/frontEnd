import axios from "axios";
import { refresh } from "./interceptors";

function createInstance() {
    return axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`
    })
}

function createInstanceWithAuth() {
    let [user, accessToken] = ['', ''];
    if (localStorage.getItem('persist:user')){
        user = JSON.parse(localStorage.getItem('persist:user') ?? '').user;
        accessToken = String(JSON.parse(user).accessToken);
    }

    const instanceWithAuth = axios.create({
        baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    instanceWithAuth.interceptors.request.use(refresh);

    return instanceWithAuth;
}


export const instance = createInstance();
export const instanceWithAuth = createInstanceWithAuth();