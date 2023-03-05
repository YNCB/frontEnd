import { useDispatch } from 'react-redux';
import { changeModal } from '../../store/slices/modalSlice';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import * as S from './LoginModalStyles';
import { setUserInfo } from '../../store/slices/userSlice';
import Swal from 'sweetalert2';

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
            getGoogleAuthCodeHandler(codeResponse.code);
        },
        flow: 'auth-code'
    })

    const getGoogleAuthCodeHandler = async (code: string) => {
        try { 
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/codebox/login/token/google?code=${code}`);
            const {status, data} = response.data;

            if (status === "200") {
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
            else if (status === "201") {
                const payload = {
                    page: 4,
                    email: data.email,
                    nickname: "",
                    password: data.password,
                    socialType: data.social_type
                }
                dispatch(changeModal(payload));
            }
        }
        catch (err) {
            console.log(err);
        }
    }

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