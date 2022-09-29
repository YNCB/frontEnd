import {Link} from 'react-router-dom';
import ModalPortal from '../../ModalPortal'
import LoginModal from '../LoginModal/LoginModal';
import { useState } from 'react';
import styled from 'styled-components';

const Header = () => {

    const [modal, setModal] = useState('')

    const handleModalOff = () => {setModal('')}
    const handleModalOn = () => {setModal('on')}

    return (
        <>
            <HeaderContainer>
                <HeaderNav>
                    <HeaderLogo to='/'><img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" /></HeaderLogo>
                    <NavWrapper>
                        <Link to = '/mybox'><button>내 박스</button></Link>
                        <Link to = '/post'><button>문제 등록</button></Link>
                        <button onClick = { handleModalOn }>로그인</button>
                    </NavWrapper>
                </HeaderNav>
            </HeaderContainer>
            {modal && <ModalPortal><LoginModal onClose={handleModalOff}/></ModalPortal>}
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
    gap: 50px;
    button {
        font-family: 'SpoqaM';
        font-size: 18px;
    }
`

export default Header