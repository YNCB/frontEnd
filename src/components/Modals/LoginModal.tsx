import { useDispatch } from 'react-redux';
import { changeModal } from '../../store/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import * as S from './LoginModalStyles';


const LoginModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const kakaoLoginHandler = () => {
        const {Kakao} = window;

        Kakao.Auth.authorize({
            redirectUri: `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth2`,
            scope: "profile_nickname,account_email,birthday"
        })
    }

    const emailLoginButtonHandler = () => {
        dispatch(changeModal(2))
    }

    const googleLogin = useGoogleLogin({
        onSuccess: codeResponse => {
            (async () => {
                console.log(codeResponse);
                // fetch(`${process.env.REACT_APP_FRONTEND_BASE_URL}/codebox/login/token/google?code=${codeResponse.code}`)
                // .then(res => res.json())
                // .then(response => {
                //     console.log(response)
                // })
                // .catch(error => console.log(error));    
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/codebox/login/token/google?code=${codeResponse.code}`);
                console.log(response);
            })();
        },
        flow: 'auth-code'
    })

    return (
        <>
            <h1>CODEBOX에 오신 것을 환영합니다!</h1>
            <S.SnsLoginContainer>
                    <S.SnsLoginWrapper>
                        <S.SnsLoginBtn bgColor={"#FFF"} onClick={() => googleLogin()}>
                            <S.SnsLoginImg sns={"googleIcon"} />
                        </S.SnsLoginBtn>
                        <S.SnsLoginTitle>Google 로그인</S.SnsLoginTitle>
                    </S.SnsLoginWrapper>
                    {/* <GoogleLogin
                        onSuccess={googleSuccess}
                        render={(renderProps) => (
                        <SnsLoginWrapper>
                            <SnsLoginBtn bgColor={"#FFF"} onClick={renderProps.onClick}>
                                <SnsLoginImg sns={"googleIcon"} />
                            </SnsLoginBtn>
                            <SnsLoginTitle>Google 로그인</SnsLoginTitle>
                        </SnsLoginWrapper>
                        )}
                    /> */}
                
                {/* <SnsLoginWrapper>
                    <SnsLoginBtn bgColor={"#FFF"}>
                        <SnsLoginImg sns={"googleIcon"} />
                    </SnsLoginBtn>
                    <SnsLoginTitle>Google 로그인</SnsLoginTitle>
                </SnsLoginWrapper> */}
                <S.SnsLoginWrapper>
                    <S.SnsLoginBtn bgColor={"#FAE100"} onClick = { () => {kakaoLoginHandler()} }>
                        <S.SnsLoginImg sns={"kakaoIcon"} />
                    </S.SnsLoginBtn>
                    <S.SnsLoginTitle>Kakao 로그인</S.SnsLoginTitle>
                </S.SnsLoginWrapper>
                <S.SnsLoginWrapper>
                    <S.SnsLoginBtn onClick = { () => emailLoginButtonHandler() } bgColor={"#5B5B5B"}>
                        <S.SnsLoginImg sns="emailIcon" />
                    </S.SnsLoginBtn>
                    <S.SnsLoginTitle>Email 로그인</S.SnsLoginTitle>
                </S.SnsLoginWrapper>
            </S.SnsLoginContainer>
        </>
    )
}

export default LoginModal