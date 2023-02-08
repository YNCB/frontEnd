import styled from "styled-components"

interface InputStyledProps {
    width?: string,
    border?: string
}

const Input = styled.input<InputStyledProps>`
    width: ${(props) => props.width};
    height: 100%;
    font-size: 16px;
    font-family: 'SpoqaR';
    padding: 0px 10px;
    border: ${(props) => props.border};
    border-radius: 6px;
`

Input.defaultProps = {
    width: '100%',
    border: '1px solid #B4B4B4'
}

interface InputProps {
    inputs: {},
    setInputs({}): void,
    name: string,
    type: string,
    placeHolder?: string,
    width?: string,
    border?: string,
    value?: string,
    buttonhandler?: () => void
}

const InputAtom = ({inputs, value, setInputs, name, type, placeHolder, width, border, buttonhandler}: InputProps) => {

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Input value={value} border={border} width={width} name={name} type={type} placeholder={placeHolder} onChange={ (e) => inputHandler(e) } onKeyUp={(e) => (e.key==='Enter' && buttonhandler) && buttonhandler()}/>
    )
}

export { Input, InputAtom }