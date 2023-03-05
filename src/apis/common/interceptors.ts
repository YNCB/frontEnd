import { AxiosRequestConfig } from "axios";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import { instance } from "./index";

export const refresh = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const user = JSON.parse(localStorage.getItem('persist:user') ?? '').user;
    let accessToken = JSON.parse(user).accessToken;
    const refreshToken = JSON.parse(user).refreshToken;
    const expireTime = JSON.parse(user).expireTime;
    const timeDiff = moment.duration(moment.tz(expireTime, 'Asia/Seoul').diff(moment().local())).seconds();

    if (timeDiff < 0 && refreshToken) {
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
            const newUser = {
                user: JSON.stringify({
                    nickname: JSON.parse(user).nickname,
                    authenticated: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expireTime: expireTime,
                }),
                _persist: JSON.stringify({
                    version:-1,
                    rehydrated:true
                })
            }
            
            localStorage.setItem('persist:user', JSON.stringify(newUser));
        }
        catch (err: any) {
            const status = err.response.status;
            console.log(err);
            Swal.fire({
                title: '토큰 만료',
                text: '재로그인이 필요합니다.',
                icon: 'error'
            })
            alert(`${status}: 재로그인이 필요합니다.`);
            localStorage.setItem('persist:user', '');
        }
    }

    if (config.headers) config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
};