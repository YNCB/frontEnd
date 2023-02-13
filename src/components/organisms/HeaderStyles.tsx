import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.header`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

export const HeaderNav = styled.nav`
    max-width: 1190px;
    height: 85px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const HeaderLogo = styled(Link)`
`

export const NavWrapper = styled.div`
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

export const DropDownWrapper = styled.div`
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    right: 0px;
    background: #fff;
`

export const DropDownContainer = styled.div`
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