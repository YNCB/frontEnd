import styled from "styled-components";

export const SnsLoginContainer = styled.section`
    display: flex;
    margin-top: 70px;
    justify-content: space-between;
    width: 100%;
`

export const SnsLoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const SnsLoginBtn = styled.button< {bgColor : string} >`
    width: 148px;
    height: 148px;
    box-shadow: 0 5px 25px rgb(0 0 0 / 15%);
    border-radius: 10px;
    background-color: ${({bgColor}) => bgColor}
`

export const SnsLoginTitle = styled.p`
    text-align: center;
    font-family: 'SpoqaM';
    color: #565656;
    margin-top: 15px;
`

export const SnsLoginImg = styled.img.attrs< {sns : string} >(
    ({sns}) => ({
        src: `${process.env.PUBLIC_URL}/assets/img/${sns}.svg`,
        alt: sns
    })
)< {sns : string} > `
`