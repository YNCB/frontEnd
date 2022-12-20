import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/config";
import ButtonAtoms from "../atoms/Button"
import CheckBoxes from "../molecules/CheckBoxes"
import { InputWithButton } from "../molecules/Input"
import { ModalContentMargin, InputContainer, InputWrapper, ButtonContainer } from "./ModalStyle"
import { join, validNickName } from "../../api/user/user";

const DetailInfoModal = () => {

    const [detailInfo, setDetailInfo] = useState({
        email: '',
        job: '',
        main_lang: '',
        nickName: '',
        password: '',
        social_type: ''
        // "email": "test@gmail.com",
        // "job": "학생",
        // "main_lang": "Java",
        // "nickname": "test",
        // "password": "test1234!",
        // "social_type": "google"
    })
    const {email, job, main_lang, nickName, password, social_type} = detailInfo;
    const [isValidNickName, setIsValidNickName] = useState(0)

    const checkLists = {
        job: ['학생', '취준생', '회사원', '기타'],
        lang: ['C++', 'Python', 'JavaScript', 'Java', 'C', 'C#', 'Swift', 'Kotlin', 'Ruby', 'Go', '기타']
    }

    const modal = useSelector((state: RootState) => state.modal)
    
    useEffect(()=>{
        setDetailInfo({
            ...detailInfo,
            email: modal.email,
            nickName: modal.nickname,
            password: modal.password,
            social_type: modal.socialType,
        })
    },[])

    const validNicknameHandler = async () => {
        if (detailInfo.nickName === '') {
            alert('닉네임을 입력해주세요.')
            return
        }

        try {
            const body = {nickName : nickName}
            const response = await validNickName(body)
            const status = response.status

            if (status === 200) {
                setIsValidNickName(1)
            }
            else if (status === 400) {
                alert('중복')
                return
            }
        }
        catch(err) {
            console.log(err)
            return
        }
    }

    const validAllHandler = () => {
        if (nickName === '') {
            alert('닉네임을 입력해주세요.')
            return
        }
        else if (isValidNickName === 0) {
            alert('닉네임 중복검사가 필요합니다.')
            return
        } 
        else if (job === '') {
            alert('직업을 선택하세요.')
            return
        } 
        else if (main_lang === '') {
            alert('메인 언어를 선택하세요.')
            return
        } 
    }

    const joinHandler = async () => {
        validAllHandler()
        try {
            const response = await join(detailInfo)
        }
        catch (err) {

        }
    }

    return (
        <ModalContentMargin>
            <h1>추가정보 입력</h1>
            <InputContainer gap={'15px'}>
                <InputWrapper>
                    <h3>닉네임</h3>
                    <InputWithButton handler={() => validNicknameHandler()} inputs={detailInfo} setInputs={setDetailInfo} name="nickName" type="text" placeHolder="닉네임을 입력하세요.">
                        중복확인
                    </InputWithButton>
                    <p></p>
                </InputWrapper>
                <InputWrapper>
                    <h3>직업</h3>
                    <CheckBoxes name='job' list={checkLists.job} inputs={detailInfo} setInputs={setDetailInfo}></CheckBoxes>
                    <p></p>
                </InputWrapper>
                <InputWrapper>
                    <h3>메인 언어</h3>
                    <CheckBoxes name='main_lang' list={checkLists.lang} inputs={detailInfo} setInputs={setDetailInfo}></CheckBoxes>
                    <p></p>
                </InputWrapper>
            </InputContainer>
            <ButtonContainer marginTop='13px'>
                <ButtonAtoms handler={() => joinHandler()} width='130px' color='white'>회원가입</ButtonAtoms>
            </ButtonContainer>
        </ModalContentMargin>
    )
}

export default DetailInfoModal