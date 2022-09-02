import {Link} from 'react-router-dom';
import header from './Header.module.css'
import ModalPortal from './../../ModalPortal'
import LoginModal from './../login/LoginModal';
import { useState } from 'react';

const Header = () => {

    const [modal, setModal] = useState('')

    const handleModalOff = () => {setModal('')}
    const handleModalOn = () => {setModal('on')}

    return (
        <>
            <header className={`${header.header}`}>
                <nav className={`${header.nav}`}>
                    <Link to='/' className={`${header.logoImg}`}><img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" /></Link>
                    <div className={`${header.navContainer}`}>
                        <button>문제 등록</button>
                        <button onClick = { handleModalOn }>로그인</button>
                    </div>
                </nav>
            </header>
            {modal && <ModalPortal><LoginModal onClose={handleModalOff}/></ModalPortal>}
        </>
    )
}

export default Header