import { useState } from "react"
import styled from "styled-components"
import CheckBoxAtom from "../atoms/CheckBox"

interface CheckBoxesProps {
    name: string,
    list: string[],
    inputs: {},
    setInputs({}): void
}

const CheckBoxContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 15px 15px;
`

const CheckBoxes = ({name, list, inputs, setInputs}: CheckBoxesProps) => {

    const [isCheck, setIsCheck] = useState(Array.from({length: list.length}, () => false))

    return (
        <CheckBoxContainer>
            {
                list.map((item, idx) => {
                    return (
                        <CheckBoxAtom key={idx} name={name} id={idx} inputs={inputs} setInputs={setInputs} isCheck={isCheck} setIsCheck={setIsCheck}>{item}</CheckBoxAtom>
                    )
                })
            }
            
        </CheckBoxContainer>
    )
}

export default CheckBoxes