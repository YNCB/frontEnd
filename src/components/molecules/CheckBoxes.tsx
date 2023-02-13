/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBoxAtom from '../atoms/CheckBox';

interface CheckBoxesProps {
	name: string;
	list: string[];
	inputs: {};
	setInputs({}): void;
	defaultId?: number | null;
}

const CheckBoxContainer = styled.ul`
	display: flex;
	flex-wrap: wrap;
	gap: 15px 15px;
`;

function CheckBoxes({name, list, inputs, setInputs, defaultId} : CheckBoxesProps) {

	const [isCheck, setIsCheck] = useState(Array.from({length: list.length}, () => false))

	return (
		<CheckBoxContainer>
			{list.map((item, idx) => {
				return (
					<CheckBoxAtom
						key={idx}
						name={name}
						id={idx}
						defaultId={defaultId}
						inputs={inputs}
						setInputs={setInputs}
						isCheck={isCheck}
						setIsCheck={setIsCheck}
					>
						{item}
					</CheckBoxAtom>
				);
			})}
		</CheckBoxContainer>
	);
}

export default CheckBoxes;
