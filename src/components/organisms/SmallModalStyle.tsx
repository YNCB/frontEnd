import styled from "styled-components";

export const SmallModalBg = styled.div`
    z-index: 999;
    background: rgba(77,77,77,0.5);
    display: block;
    position: fixed;
    inset: 0px;
`

export const SmallModalContainer = styled.section`
    z-index: 1000;
    position: fixed;
    inset: 0px;
`

export const SmallModalWrapper = styled.article`
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: relative;
    width: 300px;
    height: 400px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    -webkit-animation: iofHFD .4s ease-out alternate forwards;
    animation: iofHFD .4s ease-out alternate forwards;
`

export const SmallModalHeader = styled.div`
    border-bottom: 1px solid #B0B0B0;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 14px;
    & > span {
        
        font-family: 'SpoqaM';
    }
    & > svg {
        cursor: pointer;
        position: absolute;
        right: 14px;
    }
`

export const SmallModalContent = styled.div`
    height: calc(100% - 40px);
`

export const Lists = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    & > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

export const LikeList = styled(Lists)`

`

export const WhiteBtn = styled.button`
    width: 80px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 15px;
    font-family: 'SpoqaR';
`

export const GreyBtn = styled(WhiteBtn)`
    background: #D9D9D9;
    border: none;
`

export const BlackBtn = styled(WhiteBtn)`
    background: #000000;
    color: #fff;
`

export const NoData = styled.div`
    text-align: center;
    margin-top: 120px;
`