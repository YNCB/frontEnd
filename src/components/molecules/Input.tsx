import { InputAtom } from "../atoms/Input"
import ButtonAtom from "../atoms/Button"
import styled from "styled-components"
import SearchButton from "../atoms/SearchButton"

interface OnlyInputWrapperProps {
    inputs: {},
    setInputs({}): void,
    name: string,
    type: string,
    placeHolder?: string,
    width?: string,
    handleClick?: () => void
}

const OnlyInputWrapper = styled.div`
    height: 40px;
`

const OnlyInput = ({inputs, setInputs, name, type, placeHolder, width}: OnlyInputWrapperProps) => {
    return (
        <OnlyInputWrapper>
            <InputAtom inputs={inputs} setInputs={setInputs} name={name} type={type} placeHolder={placeHolder}></InputAtom>
        </OnlyInputWrapper>
    )
}


const InputWithButtonContainer = styled(OnlyInputWrapper)`
    display: flex;
    justify-content: space-between;
`

interface InputWithButtonContainerProps extends OnlyInputWrapperProps {
    children: string,
    handler(): void,
    value?: string,
}

const InputWithButton = ({children, value, inputs, setInputs, name, type, placeHolder, handler, width}: InputWithButtonContainerProps) => {

    return (
        <InputWithButtonContainer>
            <InputAtom value={value} inputs={inputs} setInputs={setInputs} name={name} type={type} placeHolder={placeHolder} width='67%'></InputAtom>
            <ButtonAtom width='30%' handler={handler} color='white'>{children}</ButtonAtom>
        </InputWithButtonContainer>
    )
}


const SearchBarContainer = styled.div`
    width: 370px;
    height: 50px;
    margin: 0 auto;
    display: flex;  
    border: 1px solid #B4B4B4;
    border-radius: 6px;
`

const SearchBar = ({inputs, setInputs, name, type, placeHolder, width, handleClick}: OnlyInputWrapperProps) => {

    return (
        <SearchBarContainer>
            <InputAtom border='none' inputs={inputs} setInputs={setInputs} name={name} type={type} placeHolder={placeHolder} width='90%' buttonhandler={() => handleClick && handleClick()}></InputAtom>
            <SearchButton handler={() => {handleClick && handleClick()}}/>
        </SearchBarContainer>
    )
}

export { OnlyInput, InputWithButton, SearchBar }