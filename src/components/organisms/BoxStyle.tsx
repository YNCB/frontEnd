import styled from "styled-components"
import { Link } from "react-router-dom"

export const MainContainer = styled.main`
    max-width: 1190px;
    margin: 0 auto 60px auto;
`

export const ContentWrapper = styled.section`
    margin-top: 43px;
`

export const ContentList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 30px 40px;
`

export const ContentBox = styled.li< {scale : string} >`
    width: 370px;
    height: 450px;
    border: 2px solid #D1D1D1;
    border-radius: 30px;
    display: block;
    transition: transform .2s;
    transform: ${({scale}) => scale}
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

export const ContentLink = styled(Link)`
    display: block;
    height: 80%;
    padding: 50px 40px 50px 40px;
`

export const ContentInfo = styled.div`
    display: flex;
    gap: 5px;
    font-size: 18px;
    font-family: 'SpoqaM';
    color: rgba(0, 0, 0, 0.4);
`

export const ContentTitle = styled.div`
    margin: 5px 0 20px 0;
    line-height: 35px;
    font-size: 24px;
    font-family: 'SpoqaR';
    h3 {
        color: #333;
        font-size: 24px;
    }
`

export const ContentCommentsAndLikes = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
`

export const ContentComments = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    span{
        font-size: 18px;
        font-family: 'SpoqaR';
        color: rgba(0, 0, 0, 0.4);
    }
`
export const ContentLikes = styled(ContentComments)`
    img {
        width: 21px;
    }
`

export const ContentViews = styled(ContentComments)`
    img {
        width: 24px;
    }
`

export const ContentTags = styled.ul`
    display: flex;
    gap: 3px 10px;
    font-size: 18px;
    font-family: 'SpoqaR';
    color: rgba(0,0,0,0.4);
    flex-wrap: wrap;
    margin-bottom: 10px;
`

export const ContentDetailLink = styled(Link)`
    border-top: 1px solid #D1D1D1;
    height: 20%;
    display: flex;
    align-items: center;
    padding: 15px 40px;
    justify-content: space-between;
    p {
        font-size: 20px;
        font-family: 'SpoqaR';
    }
`