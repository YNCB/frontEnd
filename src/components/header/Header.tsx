import {Link} from 'react-router-dom';
import header from './Header.module.css'

function Header() {

    return (
        <header className={`${header.header}`}>
            <Link to='/' className={`${header.logoImg}`}><img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" /></Link>
            <div className={`${header.navContainer}`}>
                <button>문제 등록</button>
                <button>로그인</button>
            </div>
        </header>
    )
}

export default Header