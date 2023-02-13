/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/config';
import ButtonAtoms from '../atoms/Button';
import CheckBoxes from '../molecules/CheckBoxes';
import { InputWithButton } from '../molecules/Input';
import {
	ModalContentMargin,
	InputContainer,
	InputWrapper,
	ButtonContainer,
} from './ModalStyle';
import { join, validNickName } from '../../apis/api/user';
import { changeModal } from '../../store/slices/modalSlice';

function DetailInfoModal() {
	const modal = useSelector((state: RootState) => state.modal);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [detailInfo, setDetailInfo] = useState({
		email: '',
		job: '',
		main_lang: '',
		nickname: '',
		password: '',
		social_type: '',
	});
	const { job, main_lang, nickname } = detailInfo;

	const [isValidNickName, setIsValidNickName] = useState(0);

	const [joinMessage, setJoinMessage] = useState({
		nicknameError: '',
		jobError: '',
		langError: '',
	});
	const [initMessage] = useState({
		nicknameError: '',
		jobError: '',
		langError: '',
	});
	const { nicknameError, jobError, langError } = joinMessage;

	const checkLists = {
		job: ['학생', '취준생', '회사원', '기타'],
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
	};

	useEffect(() => {
		setDetailInfo({
			...detailInfo,
			email: modal.email,
			nickname: modal.nickname,
			password: modal.password,
			social_type: modal.socialType,
		});
	}, []);

	const validNicknameHandler = async () => {
		if (detailInfo.nickname === '') {
			setJoinMessage({
				...initMessage,
				nicknameError: '닉네임을 입력해주세요.',
			});
			setIsValidNickName(0);
			return;
		}

		try {
			const body = { nickname };
			const response = await validNickName(body);
			const { status } = response;

			if (status === 200) {
				setJoinMessage({
					...initMessage,
					nicknameError: '사용 가능한 닉네임입니다.',
				});
				setIsValidNickName(1);
			}
		} catch (err: any) {
			const { status } = err.response;

			if (status === 400) {
				setJoinMessage({
					...initMessage,
					nicknameError: '이미 존재하는 닉네임입니다.',
				});
				setIsValidNickName(0);
			} else if (status === 406) {
				setJoinMessage({
					...initMessage,
					nicknameError: '형식에 맞지않은 닉네임입니다.',
				});
				setIsValidNickName(0);
			}
		}
	};

	const validAllCheck = () => {
		if (nickname === '') {
			setJoinMessage({
				...initMessage,
				nicknameError: '닉네임을 입력해주세요.',
			});
			setIsValidNickName(0);
			return true;
		}
		if (isValidNickName === 0) {
			setJoinMessage({
				...initMessage,
				nicknameError: '닉네임 중복검사가 필요합니다.',
			});
			setIsValidNickName(0);
			return true;
		}
		if (job === '') {
			setJoinMessage({
				...initMessage,
				jobError: '직업을 선택하세요.',
			});
			return true;
		}
		if (main_lang === '') {
			setJoinMessage({
				...initMessage,
				langError: '메인 언어를 선택하세요.',
			});
			return true;
		}
	};

	const joinHandler = async () => {
		if (validAllCheck()) return;

		try {
			const { status } = await join(detailInfo);

			if (status === 200) {
				Swal.fire({
					title: '회원가입 완료',
					text: '축하합니다! 회원가입이 완료되었습니다.',
					icon: 'success',
				}).then(() => {
					dispatch(changeModal(0));
					navigate('/');
				});
			}
		} catch (err: any) {
			const { status } = err.response;
			console.log(err);
			Swal.fire({
				title: `${status}`,
				text: '문제가 발생하였습니다. 관리자에게 문의하세요.',
				icon: 'error',
			});
		}
	};

	return (
		<ModalContentMargin>
			<h1>추가정보 입력</h1>
			<InputContainer gap="15px">
				<InputWrapper>
					<h3>닉네임</h3>
					<InputWithButton
						value={nickname}
						handler={() => validNicknameHandler()}
						inputs={detailInfo}
						setInputs={setDetailInfo}
						name="nickname"
						type="text"
						placeHolder="영문 or 한글 3~10자"
					>
						중복확인
					</InputWithButton>
					<p>{nicknameError}</p>
				</InputWrapper>
				<InputWrapper>
					<h3>직업</h3>
					<CheckBoxes
						name="job"
						list={checkLists.job}
						inputs={detailInfo}
						setInputs={setDetailInfo}
					/>
					<p>{jobError}</p>
				</InputWrapper>
				<InputWrapper>
					<h3>메인 언어</h3>
					<CheckBoxes
						name="main_lang"
						list={checkLists.lang}
						inputs={detailInfo}
						setInputs={setDetailInfo}
					/>
					<p>{langError}</p>
				</InputWrapper>
			</InputContainer>
			<ButtonContainer marginTop="13px">
				<ButtonAtoms handler={() => joinHandler()} width="130px" color="white">
					회원가입
				</ButtonAtoms>
			</ButtonContainer>
		</ModalContentMargin>
	);
}

export default DetailInfoModal;
