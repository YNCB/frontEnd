import styled, { css } from "styled-components"

type InputWrapperType = {
    width: string,
}

const InputWrapper = styled.div<InputWrapperType>`
    width: ${(props) => props.width};
    height: 50px;
    margin: auto;
`

const InputBox = styled.div`
	width: 100%;
	height: 100%;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 20px;
    font-family: 'SpoqaR';
    padding: 0px 10px;
    border: 1px solid #B4B4B4;
    border-radius: 6px;
`

interface InputProps {
    name: string,
    type: string,
    placeHolder?: string,
    handler?: any,
    width: string
}

const InputAtom = ({name, type, placeHolder, handler, width}: InputProps) => {

    return (
        <InputWrapper width={width}>
            <InputBox>
                <Input name={name} type={type} placeholder={placeHolder} onChange={ () => handler() }/>
            </InputBox>
        
        </InputWrapper>
    )
}

export default InputAtom