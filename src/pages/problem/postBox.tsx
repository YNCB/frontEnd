import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './postBoxStyle';
import CheckBoxes from '../../components/molecules/CheckBoxes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import { getUserInfo } from '../../apis/api/user';
import ButtonAtom from '../../components/atoms/Button';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getEditBox, postBox, putEditBox } from '../../apis/api/post';

const PostBox = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isEdit, postId } = location.state as {
		isEdit: boolean;
		postId: number | null;
	};
	const user = useSelector((state: RootState) => state.user);
	const [defaultId, setDefaultId] = useState(-1);
	const checkLists = {
		type: ['혼자 푼 문제', '보고 푼 문제'],
		lang: [
			'C++',
			'Python',
			'JS',
			'Java',
			'C',
			'C#',
			'Swift',
			'Kotlin',
			'Ruby',
			'Go',
			'기타',
		],
		level: ['1', '2', '3', '4', '5'],
	};
	const [post, setPost] = useState({
		title: '',
		tags: [] as string[],
		type: '',
		language: '',
		level: null,
		content: '',
		problem_uri: '',
	});
	const tagInputRef = useRef<HTMLInputElement>(null);
	const editorRef = useRef<Editor>(null);
	const [isPostContentLoaded, setPostContentLoaded] = useState(false);

	useEffect(() => {
		if (isEdit) requestGetEdit();
		else requestUserInfo();
	}, []);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPost({
			...post,
			[name]: value,
		});
	};

	const hashTagInsertHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const value = tagInputRef.current && tagInputRef.current.value;

		if (e.key === 'Enter') {
			setPost({
				...post,
				tags: Array.from(new Set(post.tags.concat([`${value}`]))),
			});
			tagInputRef.current && (tagInputRef.current.value = '');
		}
	};

	const hashTagRemoveHandler = (item: string) => {
		setPost({
			...post,
			tags: post.tags.filter((tag) => tag !== item),
		});
	};

	const postBoxHandler = () => {
		const { title, type, language, level, problem_uri } = post;
		if (
			title === '' ||
			type === '' ||
			language === '' ||
			level === null ||
			problem_uri === '' ||
			editorRef.current?.getInstance().getMarkdown() === ''
		) {
			Swal.fire({
				text: '문제 정보를 입력해주세요.',
				icon: 'warning',
			});
			return;
		}

		requestPostBox();
	};

	const editBoxHandler = () => {
		const { title, type, language, level, problem_uri } = post;
		if (
			title === '' ||
			type === '' ||
			language === '' ||
			level === null ||
			problem_uri === '' ||
			editorRef.current?.getInstance().getMarkdown() === ''
		) {
			Swal.fire({
				text: '문제 정보를 입력해주세요.',
				icon: 'warning',
			});
			return;
		}

		requestEditBox();
	};

	const requestUserInfo = useCallback(async () => {
		try {
			const response = await getUserInfo();
			const { status, data } = response.data;

			if (status === '200') {
				setPost({
					...post,
					language: data.main_lang,
				});
				setDefaultId(checkLists.lang.indexOf(data.main_lang));
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	const requestPostBox = async () => {
		try {
			const body = {
				...post,
				type: post.type === '혼자 푼 문제' ? 'ALONE' : 'SEE',
			};
			const response = await postBox(body);
			const { status } = response.data;

			if (status === '200') {
				Swal.fire({
					title: '게시글 등록 완료',
					text: '게시글 등록이 완료되었습니다.',
					icon: 'success',
				}).then(() => {
					navigate('/userbox', { state: { nickname: user.nickname || '' } });
				});
			}
		} catch (err: any) {
			if (err.response.status === 500) {
				Swal.fire({
					title: '게시글 등록 실패',
					text: '현재 이미지 등록이 불가합니다.',
					icon: 'error',
				})
			}
		}
	};

	const requestGetEdit = useCallback(async () => {
		const path = {
			nickname: user.nickname,
			postId: String(postId),
		};
		try {
			const response = await getEditBox(path);
			const { status, data } = response.data;

			if (status === '200') {
				setPost(data);
				setPostContentLoaded(true);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	const requestEditBox = async () => {
		const body = {
			nickname: user.nickname,
			postId: String(postId),
			form: {
				...post,
				type: post.type === '혼자 푼 문제' ? 'ALONE' : 'SEE',
			},
		};
		try {
			const response = await putEditBox(body);
			const { status } = response.data;

			if (status === '200') {
				Swal.fire({
					title: '게시글 수정 완료',
					text: '게시글 수정이 완료되었습니다.',
					icon: 'success',
				}).then(() => {
					navigate('/userbox', { state: { nickname: user.nickname || '' } });
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<S.PostProblemWrapper>
			<S.PostProblemSection>
				<S.ProblemInfoBox>
					<label>제목</label>
					<S.ProblemInputBox
						name="title"
						type="text"
						placeholder="제목을 입력하세요."
						value={post.title}
						onChange={(e) => inputChangeHandler(e)}
					/>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>태그</label>
					<S.ProblemTagBox>
						<div>
							{post.tags.map((item, idx) => (
								<span key={idx} onClick={() => hashTagRemoveHandler(item)}>
									#{item}
								</span>
							))}
						</div>
						<S.ProblemInputBox
							name="tags"
							ref={tagInputRef}
							type="text"
							placeholder="작성 후 'Enter'를 입력하세요."
							onKeyDown={(e) => e.key === 'Enter' && hashTagInsertHandler(e)}
						/>
					</S.ProblemTagBox>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>문제 분류</label>
					<div>
						<CheckBoxes
							name="type"
							list={checkLists.type}
							inputs={post}
							setInputs={setPost}
							defaultId={
								isEdit
									? checkLists.type.indexOf(
											post.type === 'ALONE' ? '혼자 푼 문제' : '보고 푼 문제',
									  )
									: null
							}
						></CheckBoxes>
					</div>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>풀이 언어</label>
					<div>
						<CheckBoxes
							name="language"
							list={checkLists.lang}
							inputs={post}
							setInputs={setPost}
							defaultId={
								isEdit ? checkLists.lang.indexOf(post.language) : defaultId
							}
						></CheckBoxes>
					</div>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>난이도</label>
					<div>
						<CheckBoxes
							name="level"
							list={checkLists.level}
							inputs={post}
							setInputs={setPost}
							defaultId={
								isEdit ? checkLists.level.indexOf(String(post.level)) : null
							}
						></CheckBoxes>
					</div>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>문제 링크</label>
					<S.ProblemInputBox
						name="problem_uri"
						type="text"
						placeholder="문제의 링크를 입력하세요."
						value={post.problem_uri}
						onChange={(e) => inputChangeHandler(e)}
					/>
				</S.ProblemInfoBox>
				<S.ProblemInfoBox>
					<label>풀이</label>
					{/* 이미지 base64 => img 태그로 리팩토링 필요 */}
					{post.content && (
						<Editor
							initialValue={post.content}
							height="800px"
							initialEditType="markdown"
							useCommandShortcut={true}
							hideModeSwitch={true}
							language="ko-KR"
							ref={editorRef}
							onChange={() =>
								setPost({
									...post,
									content: editorRef.current
										?.getInstance()
										.getMarkdown() as string,
								})
							}
						/>
					)}
					{post.content === '' && (
						<Editor
							initialValue=""
							height="800px"
							initialEditType="markdown"
							useCommandShortcut={true}
							hideModeSwitch={true}
							language="ko-KR"
							ref={editorRef}
							onChange={() =>
								setPost({
									...post,
									content: editorRef.current
										?.getInstance()
										.getMarkdown() as string,
								})
							}
						/>
					)}
				</S.ProblemInfoBox>
				<S.ButtonContianer>
					{isEdit ? (
						<ButtonAtom
							width="100px"
							color="black"
							handler={() => {
								editBoxHandler();
							}}
						>
							수정
						</ButtonAtom>
					) : (
						<ButtonAtom
							width="100px"
							color="black"
							handler={() => {
								postBoxHandler();
							}}
						>
							등록
						</ButtonAtom>
					)}
					<ButtonAtom
						width="100px"
						color="white"
						handler={() => {
							navigate(-1);
						}}
					>
						취소
					</ButtonAtom>
				</S.ButtonContianer>
			</S.PostProblemSection>
		</S.PostProblemWrapper>
	);
};

export default PostBox;
