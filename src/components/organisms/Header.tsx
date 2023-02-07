import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ModalPortal from '../../ModalPortal';
import Modal from '../Modals/Modal';
import LoginModal from '../Modals/LoginModal';
import EmailLogin from '../Modals/EmailLoginModal';
import { RootState } from '../../store/config';
import { changeModal } from '../../store/slices/modalSlice';
import { initUserInfo } from "../../store/slices/userSlice";
import { logout } from '../../apis/api/user';
import Swal from 'sweetalert2';
import moment from 'moment';

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
                .then(() => {
                    handleDropDown();
                    dispatch(initUserInfo());
                    navigate('/');
                })
            }
        }
        catch (err: any) {
            const status = err.response.status;
            console.log(err);

            if (status === 401 || status === 412) {
                Swal.fire({
                    title: '로그아웃',
                    text: '로그아웃되었습니다.',
                    icon: 'success'
                })
                .then(() => {
                    handleDropDown();
                    dispatch(initUserInfo());
                    navigate('/');
                })
            }
        }
    }
    
    return (
        <>
            <HeaderContainer>
                <HeaderNav>
                    <HeaderLogo to='/'><img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" /></HeaderLogo>
                    {user.authenticated ? (
                    <NavWrapper>
                        <Link to={'/userbox'} state={{ nickname: user.nickname || '' }}><button>내 박스</button></Link>
                        <Link to='/post'><button>문제 등록</button></Link>
                        <button onClick = { handleDropDown }>
                            <span>{user.nickname}</span>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path></svg>
                        </button>
                        {dropDown && (
                            <div>
                                <DropDownWrapper>
                                    <DropDownContainer>
                                        <Link to = '/' onClick={handleDropDown}>내 정보</Link>
                                        <Link to = '/' onClick={handleDropDown}>설정</Link>
                                        <Link to = '/' onClick={handleLogout}>로그아웃</Link>
                                    </DropDownContainer>
                                </DropDownWrapper>
                            </div>
                        ) || ''}
                    </NavWrapper>
                    ) : (
                    <NavWrapper>
                        <button  onClick = { handleModalOn }>로그인</button>
                    </NavWrapper>
                    )}
                </HeaderNav>
            </HeaderContainer>
            <ModalPortal>
                {
                 modal.page >= 1 && <Modal onClose={handleModalOff}/> 
                }
            </ModalPortal>
        </>
    )
}

const HeaderContainer = styled.header`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const HeaderNav = styled.nav`
    max-width: 1190px;
    height: 85px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const HeaderLogo = styled(Link)`
`

const NavWrapper = styled.div`
    display: flex;
    position: relative;
    
    a {
        margin-right: 50px;
    }

    button {
        display: flex;
        align-items: center;
        font-family: 'SpoqaM';
        font-size: 18px;
    }
`

const DropDownWrapper = styled.div`
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    right: 0px;
    background: #fff;
`

const DropDownContainer = styled.div`
    position: relative;
    z-index: 5;
    width: 12rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;

    a {
        display: block;
        padding: 13px 20px;
        font-size: 18px;
        font-family: 'SpoqaM';
    
    }
`

export default Header