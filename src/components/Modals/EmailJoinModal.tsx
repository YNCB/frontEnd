import { useDispatch } from "react-redux";
import { changeModal } from "../../store/slices/modalSlice";
import { ModalContentMargin, InputContainer, InputWrapper, ButtonContainer } from './ModalStyle'
import { useState } from "react";
import ButtonAtoms from "../atoms/Button";
import { InputWithButton, OnlyInput } from "../molecules/Input";
import { emailAuth, emailJoin } from "../../apis/api/user";

const EmailJoinModal = () => {
    const dispatch = useDispatch();

    const [joinInputs, setJoinInputs] = useState({
        email: '',
        authCode: '',
        password: '',
        passwordCheck: ''
    })
    const {email, authCode, password, passwordCheck} = joinInputs;

    const [checkAuthCode, setCheckAuthCode] = useState('');
    
    const [joinMessage, setJoinMessage] = useState({
        emailError: '',
        codeError: '',
        passwordError: '',
        passwordCheckError: ''
    });
    const [initMessage] = useState({
        emailError: '',
        codeError: '',
        passwordError: '',
        passwordCheckError: ''
    });
    const {emailError, codeError, passwordError, passwordCheckError} = joinMessage;

    const validAllCheck = () => {
        if (email === '') {
            setJoinMessage({
                ...initMessage,
                emailError: '이메일을 입력하세요.'
            })
            return true
        }
        else if (authCode === '') {
            setJoinMessage({
                ...initMessage,
                codeError: '이메일 인증이 필요합니다.'
            })
            return true

        }
        else if (checkAuthCode !== authCode) {
            setJoinMessage({
                ...initMessage,
                codeError: '인증코드가 일치하지 않습니다.'
            })
            return true
        }
        else if (password === '' || passwordCheck === '') {
            setJoinMessage({
                ...initMessage,
                passwordError: '비밀번호를 입력하세요.'
            })
            return true
        }
        else if (password !== passwordCheck) {
            setJoinMessage({
                ...initMessage,
                passwordCheckError: '비밀번호가 일치하지 않습니다.'
            })
            return true
        }
    }

    const emailAuthHandler = async () => {
        if (email === '') {
            setJoinMessage({
                ...initMessage,
                emailError: '이메일을 입력하세요.'
            })
            return
        }

        try {
            const response = await emailAuth({email});
            const status = response.status;
            const data = response.data.data;

            if (status === 200) {
                setCheckAuthCode(data.authCode);
            }
        }
        catch(err: any) {
            const status = err.response.status;
            if (status === 400) {
                setJoinMessage({
                    ...initMessage,
                    emailError: '이미 가입된 이메일입니다.'
                });
                setCheckAuthCode('');
            }
            return
        }
    }

    const emailJoinHandler = async () => {
        if (validAllCheck()) return

        try {
            const response = await emailJoin({email, password});
            const status = response.status;

            if (status === 200) {
                const payload = {
                    page: 4,
                    email,
                    password,
                    socialType: 'BASIC'
                };
                dispatch(changeModal(payload));
            }
        }
        catch (err: any) {
            const status = err.response.status;

            if (status === 406) {
                setJoinMessage({
                    ...initMessage,
                    passwordError: '비밀번호의 조건을 확인하세요.'
                })
            }
            return
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
                    <OnlyInput inputs={joinInputs} setInputs={setJoinInputs} name="password" type="password" placeHolder="영문 대,소문자+숫자+특수기호 8자 ~ 20자" width="100%"></OnlyInput>
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