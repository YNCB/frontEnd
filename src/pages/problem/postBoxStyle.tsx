import styled from "styled-components"

export const PostProblemWrapper = styled.div`
	width: 1190px;
	margin: 0 auto;
`

export const PostProblemSection = styled.section`
	padding: 30px 137px;
	div {
		margin-top: 50px;
		label {
			font-size: 20px;
			font-family: 'SpoqaM';
			color: #333;
		}
	}
`

export const ProblemNumBox = styled.div`
    display: flex;
    flex-direction: column;
	label{
		margin-bottom: 10px;
	}
`

export const ProblemAlgoBox = styled.div`
    display: flex;
    flex-direction: column;
	label{
    	margin-bottom: 10px;
`

export const ProblemCheckBox = styled.div`
	display: flex;
	gap: 17px;
	align-items: center;
`

export const ProblemInputBox = styled.input`
    height: 40px;
    border: 1px solid #B4B4B4;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
`

export const ProblemDescriptionBox = styled.div`
    display: flex;
    flex-direction: column;
	textarea{
		resize: none;
		width: 918px;
		height: 480px;
		border: 1px solid #B4B4B4;
		border-radius: 5px;
	}
`