import React, { useEffect } from "react";
import { getKakaoAuthCode } from "../../api/user/user";
import { useDispatch } from "react-redux";
import { changeModal } from "../../store/slices/modalSlice";
import axios from "axios";

const KakaoRedirect = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const authCode = String(params.get("code"));
        const config = {
            headers : {
                "code" : authCode
            }
        }
        
        async function getKakaoAuthCodeApi () {
            try {
                const response = await getKakaoAuthCode(config);
                const status = response.status;
                const data = response.data;

                if (status === 200) {
                    alert('로그인 성공')
                }
                else if (status === 201) {
                    const payload = {
                        page: 4,
                        email: data.email,
                        nickName: data.nickname,
                        password: data.password,
                        socialType: data.social_type
                    }
                    dispatch(changeModal(payload))
                }
                else {
                    alert(`${status} 에러 : 관리자에게 문의하세요.`)
                }
            }
            catch (err) {
                alert(`catch ${err} 에러 : 관리자에게 문의하세요.`)
            }
        }
        getKakaoAuthCodeApi();

        // axios
        //   .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/codebox/login/token/kakao`,
        //     {
        //       headers: {
        //         "code" : authCode
        //       }
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
    }, [])


    return (
        <></>
    )
}

export default KakaoRedirect