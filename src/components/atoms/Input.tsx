import styled from "styled-components"

type InputWrapperType = {
    width: string,
}

const InputWrapper = styled.div<InputWrapperType>`
    width: ${(props) => props.width};
    height: 40px;
    margin: auto;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: 'SpoqaR';
    padding: 0px 10px;
    border: 1px solid #B4B4B4;
    border-radius: 6px;
`

interface InputProps {
    inputs: {},
    setInputs({}): void,
    name: string,
    type: string,
    placeHolder?: string,
    width: string
}

const InputAtom = ({inputs, setInputs, name, type, placeHolder, width}: InputProps) => {

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <InputWrapper width={width}>
            <Input name={name} type={type} placeholder={placeHolder} onChange={ (e) => inputHandler(e) }/>
        </InputWrapper>
    )
}

export default InputAtom