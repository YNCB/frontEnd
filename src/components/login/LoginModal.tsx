import React from 'react'
import loginModal from './LoginModal.module.css'


const LoginModal = ({onClose}: any) => {

    return (
        <>
            <div className={`${loginModal.loginModalBack}`}></div>
            <div className={`${loginModal.loginModalContainer}`}>
                <div className={`${loginModal.loginModalBox}`}>
                    <div className={`${loginModal.loginModalHeader}`}>
                        <svg onClick={ () => {onClose()} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                    <div className={`${loginModal.loginModalContent}`}>
                        <h1>CODEBOX에 오신 것을 환영합니다!</h1>
                        <section className={`${loginModal.socialLoginContainer}`}>
                            <div className={`${loginModal.googleLoginWrapper}`}>
                                <button className={`${loginModal.googleLoginButton}`}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/googleIcon.svg`} alt="googleIcon" />
                                </button>
                                <p className={`${loginModal.googleLoginTitle}`}>Google 로그인</p>
                            </div>
                            <div className={`${loginModal.KakaoLoginWrapper}`}>
                                <button className={`${loginModal.KakaoLoginButton}`}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/kakaoIcon.svg`} alt="KakaoIcon" />
                                </button>
                                <p className={`${loginModal.KakaoLoginTitle}`}>Kakao 로그인</p>
                            </div>
                            <div className={`${loginModal.emailLoginWrapper}`}>
                                <button className={`${loginModal.emailLoginButton}`}>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/emailIcon.svg`} alt="emailIcon" />
                                </button>
                                <p className={`${loginModal.emailLoginTitle}`}>Email 로그인</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal