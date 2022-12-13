import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/config";
import { changeModal } from "../../store/slices/modalSlice";
import InputAtom from "../atoms/Input";
import { ModalContentMargin, InputContainer, InputWrapper, ButtonContainer } from './ModalStyle'
import { useState } from "react";
import { stringify } from "querystring";
import ButtonAtoms from "../atoms/Button";

const EmailSignInModal = () => {
	const navigate = useNavigate();

    const modal = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    const [signUpFail, setSignUpFail] = useState({
        email: '',
        password: ''
    })

    const [signUpInputs, setSignUpInputs] = useState({
        email: '',
        authCode: '',
        pw: '',
        pwCheck: ''
    })
    const {email, pw} = signUpInputs;
    
    const emailLoginHandler = () => {
        console.log(email)
        console.log(pw)
    }

	return (
		<ModalContentMargin>
            <h1>Email 회원가입</h1>
            <InputContainer gap={'0px'}>
                <InputWrapper>
                    <h3>이메일</h3>
                    <InputAtom inputs={signUpInputs} setInputs={setSignUpInputs} name="email" type="email" placeHolder="codebox@example.com" width="100%"></InputAtom>
                    <p></p>
                </InputWrapper>
                <InputWrapper>
                    <h3>인증코드</h3>
                    <InputAtom inputs={signUpInputs} setInputs={setSignUpInputs} name="authCode" type="password" placeHolder="비밀번호를 입력하세요." width="100%"></InputAtom>
                    <p>{signUpFail.email}</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호</h3>
                    <InputAtom inputs={signUpInputs} setInputs={setSignUpInputs} name="pw" type="password" placeHolder="비밀번호를 입력하세요." width="100%"></InputAtom>
                    <p></p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호 확인</h3>
                    <InputAtom inputs={signUpInputs} setInputs={setSignUpInputs} name="pwCheck" type="password" placeHolder="비밀번호를 다시 입력하세요." width="100%"></InputAtom>
                    <p>{signUpFail.password}</p>
                </InputWrapper>
            </InputContainer>
            <ButtonContainer marginTop='13px'>
                <ButtonAtoms handler={() => dispatch(changeModal(3))} width='130px' color='white'>회원가입</ButtonAtoms>
            </ButtonContainer>
		</ModalContentMargin>
	);
};

export default EmailSignInModal;