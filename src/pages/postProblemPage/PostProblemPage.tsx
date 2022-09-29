import { useState } from "react";
import postProblem from "./postProblemPage.module.css";

const PostProblemPage = () => {
	
	const language = ['C++', 'Python', 'Javascript', 'Java', 'C', 'C#', 'Swift', 'Kotlin', 'Ruby', 'Go', '기타']

	return (
		<div className={`${postProblem.postProblemWrapper}`}>
			<section className={`${postProblem.postProblemSection}`}>
				<div className={`${postProblem.problemNumBox}`}>
					<label>문제 번호</label>
					<input type="number" placeholder="문제 번호를 입력하세요." className={`${postProblem.problemInputBox}`}/>
				</div>
				<div className={`${postProblem.problemAlgoBox}`}>
					<label>알고리즘</label>
					<input type="text" placeholder="'#'을 붙여 엔터키" className={`${postProblem.problemInputBox}`} />
				</div>
				<div className={`${postProblem.problemTypeBox} ${postProblem.problemCheckBox}`}>
					<label>문제 분류</label>
					<div>
						<label><input type='checkbox' value='1'/>보고 푼 문제</label>
					</div>
				</div>
				<div className={`${postProblem.problemLangBox} ${postProblem.problemCheckBox}`}>
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
				</div>
				<div className={`${postProblem.problemDescriptionBox}`}>
					<label>풀이</label>
					<textarea cols={30} rows={10}></textarea>
				</div>
				<div className={`${postProblem.problemBtnBox}`}>
					<button>등록</button>
					<button>취소</button>
				</div>
			</section>
		</div>
	);
};

export default PostProblemPage;