import styled from "styled-components"

interface ButtonProps {
    children: React.ReactNode,
    width?: string,
    handler(): void,
    color: string
}

const ButtonAtom = ({children, width, handler, color}: ButtonProps) => {

    return (
        <ButtonWrapper width={width ? width : '100%'}>
            <Button onClick={() => handler()} color={color}>
                {children}
            </Button>
        </ButtonWrapper>
    )
}

const ButtonWrapper = styled.div<{ width: string }>`
    width: ${(props) => props.width};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button<{ color: string }>`
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-family: 'SpoqaM';
    border: 1px solid #B4B4B4;
    border-radius: 50px;
    ${(props) => {
            return {...theme[props.color]}
        }
    }
`

const theme: {[key: string]: {}} = {
    black: {
        backgroundColor: "#000",
        color: "#fff"
    },
    grey: {
        backgroundColor: "#D1D1D1",
        color: "#333333"
    },
    white: {
        backgroundColor: "#fff",
        color: "#000"
    }
}

export default ButtonAtom