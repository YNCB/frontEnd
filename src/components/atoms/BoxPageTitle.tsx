import styled from "styled-components"

const Title = styled.h3`
    max-width: 1190px;
    margin: 60px auto 0;
    font-size: 40px;
    text-align: center;
`

const BoxPageTitle = ({children}: {children: React.ReactNode}) => {
    return (
        <Title>{children}</Title>
    )
}

export default BoxPageTitle