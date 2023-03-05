import * as S from './ModalStyle'
import BackBtn from "../atoms/BackBtn";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import { changeModal } from '../../store/slices/modalSlice';
import LoginModal from './LoginModal';
import EmailLoginModal from './EmailLoginModal';
import DetailInfoModal from './DetailInfoModal';
import EmailJoinModal from './EmailJoinModal';

const Modal = ({onClose}: S.ModalProps) => {

    const modal = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();
    
    const backButtonHandler = () => {
        dispatch(changeModal(modal.page-1))
    }
    
    return (
        <>
            <S.ModalBlackBackground></S.ModalBlackBackground>
            <S.ModalContainer onClick={ () => {onClose()} }>
                <S.ModalBox onClick={ (e)=>e.stopPropagation() } modal={2}>
                    <S.ModalHeader>
                            <svg onClick={ () => {onClose()} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                    </S.ModalHeader>
                    <S.ModalContent>
                        { modal.page > 1 ?  <BackBtn size="50px" position="absolute" top="65px" left="25px" handler={ () => backButtonHandler() }/> : null}    
                        {
                            ( modal.page === 1 && <LoginModal/> ) || 
                            ( modal.page === 2 && <EmailLoginModal/> ) ||
                            ( modal.page === 3 && <EmailJoinModal/> ) ||
                            ( modal.page === 4 && <DetailInfoModal/> )
                        }
                    </S.ModalContent>
                </S.ModalBox>
            </S.ModalContainer>
        </>
    )
}

export default Modal