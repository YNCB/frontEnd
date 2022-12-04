import React from 'react'
import styled from 'styled-components';
import axios from "axios";
import * as S from './ModalStyle'
import { changeModal } from '../../reducers/modal';
import { useDispatch } from 'react-redux';

const LoginModal = ({onClose}: S.ModalProps) => {

    const kakaoLoginHandler = () => {
        const {Kakao} = window;

        Kakao.Auth.authorize({
            redirectUri: `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth2`,
            scope: "profile_nickname,account_email,birthday"
        })
    }

    const dispatch = useDispatch();
    const emailLoginHandler = () => {
        dispatch(changeModal(2))
    }

    return (
        <>
            <h1>CODEBOX에 오신 것을 환영합니다!</h1>
            <SnsLoginContainer>
                <SnsLoginWrapper>
                    <SnsLoginBtn bgColor={"#FFF"}>
                        <SnsLoginImg sns={"googleIcon"} />
                    </SnsLoginBtn>
                    <SnsLoginTitle>Google 로그인</SnsLoginTitle>
                </SnsLoginWrapper>
                <SnsLoginWrapper>
                    <SnsLoginBtn bgColor={"#FAE100"} onClick = { () => {kakaoLoginHandler()} }>
                        <SnsLoginImg sns={"KakaoIcon"} />
                    </SnsLoginBtn>
                    <SnsLoginTitle>Kakao 로그인</SnsLoginTitle>
                </SnsLoginWrapper>
                <SnsLoginWrapper>
                    <SnsLoginBtn onClick = { () => emailLoginHandler() } bgColor={"#5B5B5B"}>
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