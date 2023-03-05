import React, { useEffect } from "react";
import { getKakaoAuthCode } from "../../apis/api/user";
import { useDispatch, useSelector } from "react-redux";
import { changeModal } from "../../store/slices/modalSlice";
import { RootState } from "../../store/config";
import { setUserInfo } from "../../store/slices/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const KakaoRedirect = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const authCode = String(params.get("code"));
        const body = {
            params : {
                "code" : authCode
            }
        }
        
        async function getKakaoAuthCodeApi () {
            try {
                const response = await getKakaoAuthCode(body);
                const status = response.status;
                const data = response.data.data;

                if (status === 200) {
                    const userInfo = {
                        user_Id: data.user_Id,
                        nickname: data.nickname,
                        accessToken: data.authorization.slice(7),
                        refreshToken: data.refreshToken,
                        expireTime: data.expireTime
                    }
                    dispatch(setUserInfo(userInfo));

                    Swal.fire({
                        title: '로그인 성공',
                        text: 'CODEBOX에 오신 것을 환영합니다!',
                        icon: 'success'
                    })
                    .then(() => {
                        dispatch(changeModal(0));
                        navigate('/');
                    })
                }
                else if (status === 201) {
                    const payload = {
                        page: 4,
                        email: data.email,
                        nickname: data.nickname,
                        password: data.password,
                        socialType: data.social_type
                    }
                    dispatch(changeModal(payload));
                }
            }
            catch (err: any) {
                const status = err.response.status;

                alert(`${status} 에러 : 관리자에게 문의하세요.`);
            }
        }
        getKakaoAuthCodeApi();
        
    }, [])


    return (
        <></>
    )
}

export default KakaoRedirect