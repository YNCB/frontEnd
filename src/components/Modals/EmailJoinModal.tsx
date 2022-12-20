import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/config";
import { changeModal } from "../../store/slices/modalSlice";
import { ModalContentMargin, InputContainer, InputWrapper, ButtonContainer } from './ModalStyle'
import { useState } from "react";
import ButtonAtoms from "../atoms/Button";
import { InputWithButton, OnlyInput } from "../molecules/Input";
import { emailAuth, emailJoin } from "../../api/user/user";

const EmailJoinModal = () => {
	const navigate = useNavigate();

    const modal = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    const [joinInputs, setJoinInputs] = useState({
        email: '',
        authCode: '',
        password: '',
        passwordCheck: ''
    })
    const {email, authCode, password, passwordCheck} = joinInputs;

    const [checkAuthCode, setCheckAuthCode] = useState('')
    
    const [joinFail, setJoinFail] = useState({
        emailError: '',
        codeError: '',
        passwordError: '',
        passwordCheckError: ''
    })
    const {emailError, codeError, passwordError, passwordCheckError} = joinFail;

    const validCheck = () => {
        if (password === '' || passwordCheck === '') {
            setJoinFail({
                ...joinFail,
                emailError: '',
                codeError: '',
                passwordError: '비밀번호를 입력하세요.',
                passwordCheckError: ''
            })
            return
        }
        else if (password !== passwordCheck) {
            setJoinFail({
                ...joinFail,
                emailError: '',
                codeError: '',
                passwordError: '',
                passwordCheckError: '비밀번호가 일치하지 않습니다.'
            })
            return
        }
        else if (checkAuthCode !== authCode) {
            setJoinFail({
                ...joinFail,
                emailError: '',
                codeError: '인증코드가 일치하지 않습니다.',
                passwordError: '',
                passwordCheckError: ''
            })
            return
        }
    }

    const emailJoinHandler = async () => {
        validCheck();

        try {
            const response = await emailJoin({email, password})
            const status = response.status

            if (status === 200) {
                const payload = {
                    page: 4,
                    email,
                    password,
                    socialType: 'Basic'
                }
                dispatch(changeModal(payload))
            }
        }
        catch (err) {
            console.log(err)
            return
        }
    }

    const emailAuthHandler = async () => {
        if (email === '') {
            setJoinFail({
                ...joinFail,
                emailError: '이메일을 입력하세요.',
                codeError: '',
                passwordError: '',
                passwordCheckError: ''
            })
            return
        }

        try {
            const response = await emailAuth({email})
            const status = response.status
            const data = response.data.data

            if (status === 200) {
                setCheckAuthCode(data.authCode)
            }
            else if (status === 400) {
                setJoinFail({
                    ...joinFail,
                    emailError: '이미 가입된 이메일입니다.',
                    codeError: '',
                    passwordError: '',
                    passwordCheckError: ''
                })
            }
        }
        catch(err) {
            console.log(err)
        }
    }

	return (
		<ModalContentMargin>
            <h1>Email 회원가입</h1>
            <InputContainer gap={'0px'}>
                <InputWrapper>
                    <h3>이메일</h3>
                    <OnlyInput inputs={joinInputs} setInputs={setJoinInputs} name="email" type="email" placeHolder="codebox@example.com" width="100%"></OnlyInput>
                    <p>{emailError}</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>인증코드</h3>
                    <InputWithButton handler={emailAuthHandler} inputs={joinInputs} setInputs={setJoinInputs} name="authCode" type="text" placeHolder="codebox@example.com">
                        전송
                    </InputWithButton>
                    <p>{codeError}</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호</h3>
                    <OnlyInput inputs={joinInputs} setInputs={setJoinInputs} name="password" type="password" placeHolder="비밀번호를 입력하세요." width="100%"></OnlyInput>
                    <p>{passwordError}</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호 확인</h3>
                    <OnlyInput inputs={joinInputs} setInputs={setJoinInputs} name="passwordCheck" type="password" placeHolder="비밀번호를 다시 입력하세요." width="100%"></OnlyInput>
                    <p>{passwordCheckError}</p>
                </InputWrapper>
            </InputContainer>
            <ButtonContainer marginTop='13px'>
                <ButtonAtoms handler={() => emailJoinHandler()} width='130px' color='white'>다음</ButtonAtoms>
            </ButtonContainer>
		</ModalContentMargin>
	);
};

export default EmailJoinModal;