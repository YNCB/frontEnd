import { useEffect } from "react"
import styled from "styled-components"


interface CheckBoxAtomProps {
    children: string,
    name: string,
    id: number,
    inputs: {},
    setInputs({}): void,
    isCheck: boolean[],
    setIsCheck({}): void,
    defaultId?: number | null
}

const CheckBoxAtomContainer = styled.li`

`

const CheckInput = styled.input`
    display: none;
`

const CheckLabel = styled.label`
    display: flex;
    align-items: center;
    color: #717171;
    svg{
        margin-right: 5px;
    }
    
    
`

const CheckBoxAtom = ({children, name, id, inputs, setInputs, isCheck, setIsCheck, defaultId}: CheckBoxAtomProps) => {

    const checkHandler = () => {
        setInputs({
            ...inputs,
            [name]: children
        })
        let newIsCheck = [...isCheck].map(item=>false);
        newIsCheck[id] = true
        setIsCheck(newIsCheck)
    }

    useEffect(()=>{
        if (defaultId !== undefined && defaultId !== null) {
            let newIsCheck = [...isCheck].map(item=>false);
            newIsCheck[defaultId] = true
            setIsCheck(newIsCheck)
        }
    },[defaultId])

    return (
        <CheckBoxAtomContainer>
            <CheckInput id={children} type='checkbox' name={name} onClick={() => checkHandler()}/>
            <CheckLabel htmlFor={children}>
                {
                    isCheck[id] ?
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1.54C0 0.689482 0.689482 0 1.54 0H12.46C13.3105 0 14 0.689482 14 1.54V12.46C14 13.3105 13.3105 14 12.46 14H1.54C0.689482 14 0 13.3105 0 12.46V1.54Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.6761 4.84233L5.8275 10.6909L2.46392 7.32733L4.22108 5.57017L5.8275 7.17659L9.91892 3.08517L11.6761 4.84233Z" fill="white"/>
                    </svg>
                    :
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="14" rx="1" fill="#D9D9D9"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.676 4.70235L5.82745 10.5509L2.46387 7.18735L4.22103 5.43019L5.82745 7.03661L9.91887 2.94519L11.676 4.70235Z" fill="#A7A7A7"/>
                    </svg>
                }
                {children}
            </CheckLabel>
        </CheckBoxAtomContainer>
    )
}

export default CheckBoxAtom