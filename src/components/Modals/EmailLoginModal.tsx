import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeModal } from "../../store/slices/modalSlice";
import { setUserInfo } from "../../store/slices/userSlice";
import { ModalContentMargin, InputContainer, InputWrapper, ButtonContainer } from './ModalStyle'
import ButtonAtoms from "../atoms/Button";
import { OnlyInput } from "../molecules/Input";
import { emailLogin } from "../../apis/api/user";
import Swal from "sweetalert2";

const EmailLoginModal = () => {
	const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginInputs, setLoginInputs] = useState({
        email: '',
        password: ''
    })

    const [loginMessage, setLoginMessage] = useState({
        emailError: '',
        passwordError: ''
    })
    const {emailError, passwordError} = loginMessage;
    const [initError] = useState({
        emailError: '',
        passwordError: ''
    })
    
    const emailLoginHandler = async () => {
        try {
            const response = await emailLogin(loginInputs);
            const status = response.status;
            const data = response.data.data;

            if (status === 200) {
                const userInfo = {
                    user_Id: data.user_Id,
                    nickname: data.nickname,
                    accessToken: data.authorization.slice(7),
                    refreshToken: data.refreshToken,
                    expireTime: data.expireTime,
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
        }
        catch (err: any) {
            const status = err.response.status;
            const message = err.response.data.message;
            
            if (status === 400 || status === 401) {
                setLoginMessage({
                    ...initError,
                    emailError: message
                })
            }
            return
        }
    }

	return (
		<ModalContentMargin>
            <h1>Email 로그인</h1>
            <InputContainer gap={'15px'}>
                <InputWrapper>
                    <h3>이메일</h3>
                    <OnlyInput inputs={loginInputs} setInputs={setLoginInputs} name="email" type="email" placeHolder="codebox@example.com" width="100%"></OnlyInput>
                    <p>{emailError}</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호</h3>
                    <OnlyInput inputs={loginInputs} setInputs={setLoginInputs} name="password" type="password" placeHolder="비밀번호를 입력하세요." width="100%"></OnlyInput>
                    <p>{passwordError}</p>
                </InputWrapper>
            </InputContainer>
            <ButtonContainer marginTop='35px'>
                <ButtonAtoms handler={() => emailLoginHandler()} width='130px' color='white'>로그인</ButtonAtoms>
                <ButtonAtoms handler={() => dispatch(changeModal(3))} width='130px' color='white'>회원가입</ButtonAtoms>
            </ButtonContainer>
		</ModalContentMargin>
	);
};

export default EmailLoginModal;
