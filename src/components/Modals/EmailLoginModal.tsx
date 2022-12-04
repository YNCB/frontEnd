import { useNavigate } from "react-router-dom";
import * as S from './ModalStyle'
import BackBtn from "../atoms/BackBtn";
import InputAtom from "../atoms/Input";
import styled from 'styled-components';
import { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { changeModal } from "../../reducers/modal";

const EmailLoginModal = ({onClose}: S.ModalProps) => {
	const navigate = useNavigate();

    const modal = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch();
    
    const emailLoginHandler = () => {
        
    }

	return (
		<>
            <h1>Email 로그인</h1>
            <InputAtom name="email" type="text" placeHolder="이메일을 입력하세요." width="271px"></InputAtom>
            <button onClick={() => dispatch(changeModal(3))}></button>
		</>
	);
};

export default EmailLoginModal;
