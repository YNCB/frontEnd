import { useState } from "react";
import postProblem from "./postProblemPage.module.css";
import styled from "styled-components";

const PostProblemPage = () => {
	
	const language = ['C++', 'Python', 'Javascript', 'Java', 'C', 'C#', 'Swift', 'Kotlin', 'Ruby', 'Go', '기타']

	return (
		<PostProblemWrapper>
			<PostProblemSection>
				<ProblemNumBox>
					<label>문제 번호</label>
					<ProblemInputBox type="number" placeholder="문제 번호를 입력하세요."/>
				</ProblemNumBox>
				<ProblemAlgoBox>
					<label>알고리즘</label>
					<ProblemInputBox type="text" placeholder="'#'을 붙여 엔터키"/>
				</ProblemAlgoBox>
				<ProblemCheckBox>
					<label>문제 분류</label>
					<div>
						<label><input type='checkbox' value='1'/>보고 푼 문제</label>
					</div>
				</ProblemCheckBox>
				<ProblemCheckBox>
					<label>풀이 언어</label>
					<div>
						{ 
							language.map((item,idx)=>{
								return(
									<label><input type='checkbox' value={item}/>{item}</label>
								)
							})
						}
					</div>
				</ProblemCheckBox>
				<ProblemDescriptionBox>
					<label>풀이</label>
					<textarea cols={30} rows={10}></textarea>
				</ProblemDescriptionBox>
				<div>
					<button>등록</button>
					<button>취소</button>
				</div>
			</PostProblemSection>
		</PostProblemWrapper>
	);
};

const PostProblemWrapper = styled.div`
	width: 1190px;
	margin: 0 auto;
`

const PostProblemSection = styled.section`
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

const ProblemNumBox = styled.div`
    display: flex;
    flex-direction: column;
	label{
		margin-bottom: 10px;
	}
`

const ProblemAlgoBox = styled.div`
    display: flex;
    flex-direction: column;
	label{
    	margin-bottom: 10px;
`

const ProblemCheckBox = styled.div`
	display: flex;
	gap: 17px;
	align-items: center;
`

const ProblemInputBox = styled.input`
    height: 40px;
    border: 1px solid #B4B4B4;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
`

const ProblemDescriptionBox = styled.div`
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


export default PostProblemPage;