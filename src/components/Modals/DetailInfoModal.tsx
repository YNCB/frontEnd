
import * as S from './ModalStyle'
import BackBtn from "../atoms/BackBtn";
import InputAtom from "../atoms/Input";

const DetailInfoModal = ({onClose}: S.ModalProps) => {

    return (
        <>
            <h1>추가정보 입력</h1>
            <InputAtom name="email" type="text" placeHolder="이메일을 입력하세요." width="271px"></InputAtom>
               
        </>
    )
}

export default DetailInfoModal