import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalPortal from '../../ModalPortal';
import Modal from '../Modals/Modal';
import { RootState } from '../../store/config';
import { changeModal } from '../../store/slices/modalSlice';
import { initUserInfo } from "../../store/slices/userSlice";
import { logout } from '../../apis/api/user';
import Swal from 'sweetalert2';
import * as S from './HeaderStyles'

const Header = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const user = useSelector((state:RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dropDown, setDropDown] = useState(0);

    const handleModalOff = () => dispatch(changeModal(0));
    const handleModalOn = () => dispatch(changeModal(1));

    const handleDropDown = () => {
        setDropDown(1-dropDown);
    }

    const handleLogout = async () => {
        dispatch(initUserInfo());
        navigate('/');
        handleDropDown();
        const headers = {
            headers : {
                Authorization: `Bearer ${user.accessToken}` || '',
            }
        }

        try {
            const response = await logout(headers);
            const status = response.status;
            if (status === 200 || status === 201) {
                Swal.fire({
                    title: '로그아웃',
                    text: '로그아웃되었습니다.',
                    icon: 'success'
                })
            }
        }
        catch (err: any) {
            const status = err.response.status;
            console.log(err);

            if (status === 401 || status === 412) {
                navigate('/');
                Swal.fire({
                    title: '로그아웃',
                    text: '로그아웃되었습니다.',
                    icon: 'success'
                })
            }
        }
    }
    
    return (
        <>
            <S.HeaderContainer>
                <S.HeaderNav>
                    <S.HeaderLogo to='/'><img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" /></S.HeaderLogo>
                    {user.authenticated ? (
                    <S.NavWrapper>
                        <Link to={'/userbox'} state={{ nickname: user.nickname || '' }}><button>내 박스</button></Link>
                        <Link to='/postBox' state={{ isEdit: false, postId: null }}><button>문제 등록</button></Link>
                        <button onClick = { handleDropDown }>
                            <span>{user.nickname}</span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path></svg>
                        </button>
                        {dropDown && (
                            <div>
                                <S.DropDownWrapper>
                                    <S.DropDownContainer>
                                        <Link to = '/Setting' onClick={handleDropDown}>내 정보</Link>
                                        <Link to = '/' onClick={handleLogout}>로그아웃</Link>
                                    </S.DropDownContainer>
                                </S.DropDownWrapper>
                            </div>
                        ) || ''}
                    </S.NavWrapper>
                    ) : (
                    <S.NavWrapper>
                        <button  onClick = { handleModalOn }>로그인</button>
                    </S.NavWrapper>
                    )}
                </S.HeaderNav>
            </S.HeaderContainer>
            <ModalPortal>
                {
                 modal.page >= 1 && <Modal onClose={handleModalOff}/> 
                }
            </ModalPortal>
        </>
    )
}

export default Header