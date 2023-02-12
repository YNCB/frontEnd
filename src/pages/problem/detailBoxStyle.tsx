import styled from "styled-components";

export const DetailBoxContainer = styled.div`
    width: 1190px;
    margin: 0 auto;
`

export const DetailBoxSection = styled.section`
    padding: 135px;
`

export const DetailBoxHeaderContainer = styled.div`
    padding-bottom: 30px;
    margin-bottom: 60px;
    border-bottom: 3px solid #F2F2F2;
`

export const DetailBoxTItle = styled.h2`
    font-size: 32px;
`

export const DetailBoxHeaderInfoContainer = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const DetailBoxHeaderInfo = styled.div`
    display: flex;
    gap: 10px;

    & > span: nth-of-type(3) {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;

        & > img {
            width: 15px;
        }
    }
`

export const DetailBoxSetting = styled.div`
    display: flex;
    gap: 10px;
    & > button {
        font-size: 16px;
        font-family: 'SpoqaR';
        color: #717171;
    }
`

export const DetailBoxInfoContainer = styled.div`
    margin-bottom: 90px;
`

export const DetailBoxInfoListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const DetailBoxInfoList = styled.li `
    display: flex;
    font-size: 20px;

    & > p:first-of-type {
        color: #717171;
        margin-right: 32px;
        width: 100px;
    }
    a {
        text-decoration: underline;
    }
`

export const DetailBoxTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

export const DetailBoxContentContainer = styled.div`
    margin-bottom: 250px;

    & > h3 {
        font-size: 20px;
        border-bottom: 3px solid #F2F2F2;
        padding-bottom: 20px;
    }
`

export const DetailBoxLikesRepliesContainer = styled.div`

`

export const DetailBoxLikesContainer = styled.div`
    margin-bottom: 60px;
`

export const DetailBoxLikes = styled.div`
    width: 70px;
    height: 70px;
    border: 1px solid #000000;
    border-radius: 10px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export const DetailBoxRepliesContainer = styled.div`
    & > h5 {
        font-size: 18px;
    }
`

export const DetailBoxReplyAddContainer = styled.div`
    & > textarea {
        width: 100%;
        border: 1px solid #b4b4b4;
        border-radius: 5px;
        resize: none;
        height: 100px;
        margin-top: 10px;
        padding: 10px;
        font-size: 16px;
        font-family: 'SpoqaR';
    }
    & > textarea:focus {
        outline: 0;
    }

    & > div {    
        margin-left: auto;
        margin-top: 15px;
    }
`