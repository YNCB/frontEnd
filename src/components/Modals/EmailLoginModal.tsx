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

const EmailLoginModal = () => {
	const navigate = useNavigate();

    const modal = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();

    const [loginInputs, setLoginInputs] = useState({
        email: '',
        pw: ''
    })
    const {email, pw} = loginInputs;
    
    const emailLoginHandler = () => {
        console.log(email)
        console.log(pw)
    }

	return (
		<ModalContentMargin>
            <h1>Email 로그인</h1>
            <InputContainer gap={'13px'}>
                <InputWrapper>
                    <h3>이메일</h3>
                    <InputAtom inputs={loginInputs} setInputs={setLoginInputs} name="email" type="email" placeHolder="codebox@example.com" width="100%"></InputAtom>
                    <p>서비스에 가입되지 않은 이메일입니다.</p>
                </InputWrapper>
                <InputWrapper>
                    <h3>비밀번호</h3>
                    <InputAtom inputs={loginInputs} setInputs={setLoginInputs} name="pw" type="password" placeHolder="비밀번호를 입력하세요." width="100%"></InputAtom>
                    <p>비밀번호가 일치하지 않습니다.</p>
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
