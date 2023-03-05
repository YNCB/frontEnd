import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, putUserInfo, validNickName } from "../../apis/api/user";
import { InputWithButton } from "../../components/molecules/Input";
import { RootState } from "../../store/config";
import { ButtonContainer, InputContainer } from "../../components/Modals/ModalStyle";
import CheckBoxes from "../../components/molecules/CheckBoxes";
import ButtonAtom from "../../components/atoms/Button";
import { setUserInfo } from "../../store/slices/userSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as S from './myInfoSettingStyles'

const MyInfoSetting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state : RootState) => state.user);
    const [myInfo, setMyInfo] = useState({
        nickName: '',
        job: '',
        main_lang: '',
    })
    const [errMessage, setErrMessage] = useState({
        nicknameErr: '',
        jobErr: '',
        langErr: ''
    })
    const [initErrMessage] = useState({
        nicknameErr: '',
        jobErr: '',
        langErr: ''
    })
    const {nicknameErr, jobErr, langErr} = errMessage;
    let {nickName} = myInfo;
    const [defaultId, setDefaultId] = useState({
        job: -1,
        main_lang: -1
    })
    const [isValid, setValid] = useState(false);

    const checkLists = {
        job: ['학생', '취준생', '회사원', '기타'],
        lang: ['C++', 'Python', 'JS', 'Java', 'C', 'C#', 'Swift', 'Kotlin', 'Ruby', 'Go', '기타']
    }
    
    const requestUserInfo = useCallback( async () => {
        try {
            const response = await getUserInfo();
            const {status, data} = response.data;

            if (status === '200') {
                setMyInfo(data)
                setDefaultId({
                    ...defaultId,
                    job: checkLists.job.indexOf(data.job),
                    main_lang: checkLists.lang.indexOf(data.main_lang)
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [])
    
    const requestPutUserInfoHandler = async () => {
        if (user.nickname !== nickName && !isValid) {
            setErrMessage({
                ...initErrMessage,
                nicknameErr : '닉네임 중복검사가 필요합니다.'
            })
            return
        }

        try {
            const response = await putUserInfo(myInfo);
            const {status, data} = response.data;

            if (status === '200') {
                const userInfo = {
                    user_Id: data.user_Id,
                    nickname: data.nickname,
                    accessToken: data.authorization.slice(7),
                    refreshToken: data.refreshToken,
                    expireTime: data.expireTime
                }
                dispatch(setUserInfo(userInfo));

                Swal.fire({
                    title: '회원정보 수정 완료',
                    text: '회원정보 수정이 완료되었습니다.',
                    icon: 'success'
                })
                .then(() => {
                    navigate('/');
                })
            }
        }
        catch (err: any) {
            const status = err.response.status;
            Swal.fire({
                title: `${status}`,
                text: '문제가 발생하였습니다. 관리자에게 문의하세요.',
                icon: 'error'
            })
            .then(() => {
                navigate('/');
            })
        }
    }

    const validNicknameHandler = async () => {
        if (nickName === user.nickname) return
        if (nickName === '') {
            setErrMessage({
                ...initErrMessage,
                nicknameErr : '닉네임을 입력해주세요.'
            })
            return
        }

        try {
            const body = {nickname: nickName}
            const response = await validNickName(body)
            const status = response.status
            
            if (status === 200) {
                setErrMessage({
                    ...initErrMessage,
                    nicknameErr : '사용 가능한 닉네임입니다.'
                })
                setValid(true);
            }
        }
        catch (err: any) {
            const status = err.response.status;
            
            if (status === 400 || status === 500) {
                setErrMessage({
                    ...initErrMessage,
                    nicknameErr : '이미 존재하는 닉네임입니다.'
                })
                setValid(false);
            }
            else if (status === 406) {
                setErrMessage({
                    ...initErrMessage,
                    nicknameErr : '형식에 맞지않은 닉네임입니다.'
                })
                setValid(false);
            }
            
            return
        }
    }

    useEffect(() => {
        requestUserInfo();
    }, [])

    return (
        <S.MyInfoContainer>
            <S.MyInfoWrapper>
                <h2>내 정보 수정</h2>
                <InputContainer gap={'15px'}>
                    <S.InputWrapper>
                        <h3>닉네임</h3>
                        <InputWithButton name="nickName" value={nickName} handler={() => validNicknameHandler()} inputs={myInfo} setInputs={setMyInfo} type="text" placeHolder="영문 or 한글 3~10자">
                            중복확인
                        </InputWithButton>
                        <p>{nicknameErr}</p>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <h3>직업</h3>
                        <CheckBoxes name='job' list={checkLists.job} inputs={myInfo} setInputs={setMyInfo} defaultId={defaultId.job}></CheckBoxes>
                        <p>{jobErr}</p>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <h3>메인 언어</h3>
                        <CheckBoxes name='main_lang' list={checkLists.lang} inputs={myInfo} setInputs={setMyInfo} defaultId={defaultId.main_lang}></CheckBoxes>
                        <p>{langErr}</p>
                    </S.InputWrapper>
                </InputContainer>
                <div>
                    <button>완료</button>
                </div>
                <ButtonContainer marginTop='13px'>
                    <ButtonAtom handler={() => requestPutUserInfoHandler()} width='130px' color='white'>완료</ButtonAtom>
                </ButtonContainer>
            </S.MyInfoWrapper>
        </S.MyInfoContainer>
    )
}

export default MyInfoSetting