import React from 'react'
import loginModal from './LoginModal.module.css'


const LoginModal = ({onClose} : any) => {
    return (
        <>
            <div className={`${loginModal.loginModalBack}`}></div>
            <div className={`${loginModal.loginModalContainer}`}>
                <div className={`${loginModal.loginModalBox}`}>
                    <div className={`${loginModal.closeWrapper}`}>
                        <svg onClick={ () => {onClose()} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal