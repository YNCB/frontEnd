import styled from "styled-components";


export const DetailBoxRepliesBox = styled.div`
    margin-top: 50px;

    & > div {
        border-bottom: 1px solid #F1F3F5;
        padding: 24px 0;
    }
`

export const DetailBoxReplyContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
`

export const ReplyInfo = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    & > span: first-of-type {
        font-family: 'SpoqaM';
    }
    & > span: nth-of-type(2) {
        color: #868E96;
        font-size: 14px;
    }
`

export const ReplySetting = styled.div`
    display: flex;
    gap: 10px;

    & > button {
        font-size: 14px;
        font-family: 'SpoqaM';

    }
`

export const DetailBoxReplyContent = styled.p`
    font-size: 20px;
    font-family: 'SpoqaL';
    margin-bottom: 30px;
`

export const RereplyContainer = styled.div`
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    border-radius: 5px;

    & > textarea {
        width: 90%;
        border: none;
        border-radius: 5px;
        resize: none;
        height: 100px;
        padding: 10px;
        font-size: 16px;
        font-family: 'SpoqaR';
        margin-top: 30px;
    }
    & > textarea:focus {
        outline: 0;
    }

    & > div {
        margin: 15px 40px 20px auto;
    }

`

export const RereplyButton = styled.div`
    & > span {
        cursor: pointer;
        color: #818181;
    }
`