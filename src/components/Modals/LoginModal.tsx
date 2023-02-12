import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeModal } from '../../store/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


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
            <SnsLoginContainer>
                    <SnsLoginWrapper>
                        <SnsLoginBtn bgColor={"#FFF"} onClick={() => googleLogin()}>
                            <SnsLoginImg sns={"googleIcon"} />
                        </SnsLoginBtn>
                        <SnsLoginTitle>Google 로그인</SnsLoginTitle>
                    </SnsLoginWrapper>
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
                <SnsLoginWrapper>
                    <SnsLoginBtn bgColor={"#FAE100"} onClick = { () => {kakaoLoginHandler()} }>
                        <SnsLoginImg sns={"KakaoIcon"} />
                    </SnsLoginBtn>
                    <SnsLoginTitle>Kakao 로그인</SnsLoginTitle>
                </SnsLoginWrapper>
                <SnsLoginWrapper>
                    <SnsLoginBtn onClick = { () => emailLoginButtonHandler() } bgColor={"#5B5B5B"}>
                        <SnsLoginImg sns="emailIcon" />
                    </SnsLoginBtn>
                    <SnsLoginTitle>Email 로그인</SnsLoginTitle>
                </SnsLoginWrapper>
            </SnsLoginContainer>
        </>
    )
}

const SnsLoginContainer = styled.section`
    display: flex;
    margin-top: 70px;
    justify-content: space-between;
    width: 100%;
`

const SnsLoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const SnsLoginBtn = styled.button< {bgColor : string} >`
    width: 148px;
    height: 148px;
    box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
    border-radius: 10px;
    background-color: ${({bgColor}) => bgColor}
`

const SnsLoginTitle = styled.p`
    text-align: center;
    font-family: 'SpoqaM';
    color: #565656;
    margin-top: 15px;
`

const SnsLoginImg = styled.img.attrs< {sns : string} >(
    ({sns}) => ({
        src: `${process.env.PUBLIC_URL}/assets/img/${sns}.svg`,
        alt: sns
    })
)< {sns : string} > `
`

export default LoginModal