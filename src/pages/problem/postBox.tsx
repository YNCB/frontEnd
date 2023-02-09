import React from 'react';
import * as S from './postBoxStyle'

const PostBox = () => {
	
	const language = ['C++', 'Python', 'Javascript', 'Java', 'C', 'C#', 'Swift', 'Kotlin', 'Ruby', 'Go', '기타']

	return (
		<S.PostProblemWrapper>
			<S.PostProblemSection>
				<S.ProblemNumBox>
					<label>문제 번호</label>
					<S.ProblemInputBox type="number" placeholder="문제 번호를 입력하세요."/>
				</S.ProblemNumBox>
				<S.ProblemAlgoBox>
					<label>알고리즘</label>
					<S.ProblemInputBox type="text" placeholder="'#'을 붙여 엔터키"/>
				</S.ProblemAlgoBox>
				<S.ProblemCheckBox>
					<label>문제 분류</label>
					<div>
						<label><input type='checkbox' value='1'/>보고 푼 문제</label>
					</div>
				</S.ProblemCheckBox>
				<S.ProblemCheckBox>
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
				</S.ProblemCheckBox>
				<S.ProblemDescriptionBox>
					<label>풀이</label>
					<textarea cols={30} rows={10}></textarea>
				</S.ProblemDescriptionBox>
				<div>
					<button>등록</button>
					<button>취소</button>
				</div>
			</S.PostProblemSection>
		</S.PostProblemWrapper>
	);
};

export default PostBox;