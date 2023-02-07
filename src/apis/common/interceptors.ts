import { AxiosInstance, AxiosRequestConfig } from "axios";
import moment from "moment";
import { refreshUserInfo } from "../../store/slices/userSlice";
import { instance } from "./index";

export const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const user = JSON.parse(localStorage.getItem('persist:user') ?? '').user;
    let accessToken = JSON.parse(user).accessToken;
    const refreshToken = JSON.parse(user).refreshToken;
    const expireTime = JSON.parse(user).expireTime;
    console.log(accessToken, expireTime);
    
    if (moment(expireTime).diff(moment()) < 0 && refreshToken) {
        const headers = {
            headers: {
                RefreshToken: refreshToken,
            }
        };
        
        try {
            const response = await instance.post(`/codebox/refreshToken`, null, headers);
            const data = response.data.data;
            accessToken = data.authorization.slice(7);
            const refreshToken = data.refreshToken;
            const expireTime = data.expireTime;
            console.log(accessToken, expireTime);
            refreshUserInfo({
                accessToken,
                refreshToken,
                expireTime,
            });
        }
        catch (err: any) {
            const status = err.response.status;
            console.log(err);
            alert(`${status} 에러 발생: 관리자에게 문의하세요.`);
        }
    }

    if (config.headers) config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
};