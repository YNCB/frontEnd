import styled from "styled-components";

export const TItleContainer = styled.div`
    max-width: 1190px;
    margin: 60px auto 0;
    display: flex;
    justify-content: center;
`

export const MainTitle = styled.h3`
    font-size: 40px;
    text-align: center;
`

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

export const UserNickname = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;

    & > h3 {
        font-size: 36px;
    }
    & > button {
        width: 80px;
        height: 28px;
        background: #D9D9D9;
        border-radius: 5px;
        font-size: 16px;
        font-family: 'SpoqaR';
    }
`

export const UserInfo = styled.ul`
    margin-top: 15px;
    display: flex;
    gap: 30px;

    & > li > span: nth-of-type(2) {
        font-family: 'SpoqaM';
        margin-left: 10px;
    }
    & > li > button {
        font-family: 'SpoqaM';
        margin-left: 10px;
    }
`