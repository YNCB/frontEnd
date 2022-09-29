import React from 'react'
import styled, { keyframes } from 'styled-components';

const LoginModal = ({onClose}: {onClose():void}) => {

    return (
        <>
            <LoginModalBlack></LoginModalBlack>
            <LoginModalContainer onClick={ () => {onClose()} }>
                <LoginModalBox onClick={ (e)=>e.stopPropagation() }>
                    <LoginModalHeader>
                        <svg onClick={ () => {onClose()} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </LoginModalHeader>
                    <LoginModalContent>
                        <h1>CODEBOX에 오신 것을 환영합니다!</h1>
                        <SnsLoginContainer>
                            <SnsLoginWrapper>
                                <SnsLoginBtn bgColor={"#FFF"}>
                                    <SnsLoginImg sns={"googleIcon"} />
                                </SnsLoginBtn>
                                <SnsLoginTitle>Google 로그인</SnsLoginTitle>
                            </SnsLoginWrapper>
                            <SnsLoginWrapper>
                                <SnsLoginBtn bgColor={'#FAE100'}>
                                    <SnsLoginImg sns={"KakaoIcon"} />
                                </SnsLoginBtn>
                                <SnsLoginTitle>Kakao 로그인</SnsLoginTitle>
                            </SnsLoginWrapper>
                            <SnsLoginWrapper>
                                <SnsLoginBtn bgColor={'#5B5B5B'}>
                                    <SnsLoginImg sns="emailIcon" />
                                </SnsLoginBtn>
                                <SnsLoginTitle>Email 로그인</SnsLoginTitle>
                            </SnsLoginWrapper>
                        </SnsLoginContainer>
                    </LoginModalContent>
                </LoginModalBox>
            </LoginModalContainer>
        </>
    )
}

const LoginModalBlack = styled.div`
    z-index: 999;
    background: rgba(77, 77, 77, 0.5);
    display: block;
    position: fixed;
    inset: 0px;
`

const LoginModalContainer = styled.section`
    z-index: 1000;
    position: fixed;
    inset: 0px;
`

const downModal = keyframes`
    0% {
        transform: translateY(-200%) translateX(-50%);
    }
    100% {
        transform: translateY(-50%) translateX(-50%);
    }
`
const LoginModalBox = styled.article`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    width: 850px;
    height: 580px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    animation: ${downModal} .4s ease-out alternate forwards;
`

const LoginModalHeader = styled.div`
    background: #d9d9d9;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    svg {
        cursor: pointer;
    }
`

const LoginModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        margin-top: 70px;
        font-size: 32px;
        font-family: 'SpoqaM';
    }
`

const SnsLoginContainer = styled.section`
    display: flex;
    margin-top: 70px;
    justify-content: space-between;
    width: 60%;
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
    font-family: 'SpoqaB';
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