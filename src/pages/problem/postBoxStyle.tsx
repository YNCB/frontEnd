import styled from "styled-components"

export const PostProblemWrapper = styled.div`
	width: 1190px;
	margin: 0 auto;
`

export const PostProblemSection = styled.section`
	padding: 30px 137px;
	> div {
		margin-top: 50px;
		> label {
			font-size: 20px;
			font-family: 'SpoqaM';
			color: #333;
			flex-shrink: 0;
		}
	}
`

export const ProblemInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	label{
		margin-bottom: 10px;
	}
`

export const ProblemTitleBox = styled.div`
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
	}
`

export const ProblemCheckBox = styled.div`
	display: flex;
    flex-direction: column;
	label{
    	margin-bottom: 10px;
	}
`

export const ProblemInputBox = styled.input`
    height: 40px;
    border: none;
    border-bottom: 1px solid #B4B4B4;
    font-size: 16px;
    padding: 5px 10px;
	flex-shrink: 1;
	width: 100%;
`

export const ProblemTagBox = styled.div`
	display: flex;
    align-items: center;
	border-bottom: 1px solid #B4B4B4;
    padding-bottom: 5px;

	> div {
		display: flex;
		gap: 3px;
		flex-shrink: 0;

		> span {
			border-radius: 25px;
			padding: 5px 10px;
			background-color: #444444;
			color: #f7f7f7;
			font-family: 'SpoqaR';
			font-size: 16px;
			cursor: pointer;
		}
	}

	input {
		border: none;
    	font-family: 'SpoqaR';
		width: 100%;
		flex-shrink: 1;
	}
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
	label{
		margin-bottom: 10px;
	}
`

export const ButtonContianer = styled.div`
	display: flex;
    justify-content: center;
    gap: 10px;
`