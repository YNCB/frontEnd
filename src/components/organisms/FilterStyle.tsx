import styled from "styled-components"

export const FilterContainer = styled.section`
    max-width: 1190px;
    margin: 80px auto;
`

export const FilterWrapper = styled.div`
    margin-bottom: 50px;
    h4{
        font-size: 26px;
        font-family: 'SpoqaM';
        border-bottom: 2px solid #F2F2F2;
        padding-bottom: 5px;
    }
`

export const FilterList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 15px 10px;
    padding-top: 15px;
`

export const Filters = styled.li< {scale : string, opacity : string} >`
    opacity: ${({opacity}) => opacity};
    padding: 10px 20px;
    border: 1px solid #D0D0D0;
    border-radius: 30px;
    cursor: pointer;
    transform-origin: 50% 0;
    transition: transform 0.2s;
    transform: ${({scale}) => scale};
    
    &: hover {
    }
`

export const Span = styled.span< {scale : string} >`
    font-size: 18px;
    font-family: 'SpoqaR';
`