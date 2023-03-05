import styled from "styled-components";


export const DetailBoxRepliesBox = styled.div`
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
        background-color: initial;
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

export const RereplyButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 30%;
`

export const RereplyButton = styled.div`
    & > span {
        cursor: pointer;
        color: #818181;
    }
    margin-bottom: 15px;
`

export const RereplyBox = styled.div`
    padding: 20px 40px;
    background-color: rgba(0, 0, 0, 0.016);
`

export const Rereplybutton = styled.div`
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: 'SpoqaL';
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 5px;
`