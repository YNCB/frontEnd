import React, { useEffect } from "react";
import axios from "axios";

const KakaoRedirect = () => {
    
    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const authCode = params.get("code");
        
        axios
          .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/codebox/login/token/kakao`,
            {
              headers: {
                "code" : authCode
              }
            }
          )
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })


        // const body = {
        //   grant_type : "authorization_code",
        //   client_id : `${process.env.REACT_APP_JS_SDK_KEY}`,
        //   redirect_uri : `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth2`,
        //   code : params.get("code")
        // }
        
        // axios
        //   .post(
        //     `https://kauth.kakao.com/oauth/token`,
        //     body,
        //     {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        //         },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res.data.access_token)
        //     Kakao.Auth.setAccessToken(res.data.access_token);
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