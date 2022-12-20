import { instance } from "../common";

interface emailAuthType {
    email: string
}

interface validNickNameType {
    nickName: string
}

interface emailJoinType {
    email: string,
    password: string
}

interface JoinType {
    email: string,
    job: string,
    main_lang: string,
    nickName: string,
    password: string,
    social_type: string
}

interface getKakaoAuthCodeType {
    headers : {
        "code" : string
    }
}

function emailAuth(userData: emailAuthType) {
    return instance.post('join/mailConfirm', userData)
}

function validNickName(userData: validNickNameType) {
    return instance.post('join/validNickName', userData)
}

function emailJoin(userData: emailJoinType) {
    return instance.post('join1', userData)
}

function join(userData: JoinType) {
    return instance.post('join2', userData)
}

function getKakaoAuthCode(config: getKakaoAuthCodeType) {
    return instance.get('login/token/kakao', config)
}

export { emailAuth, validNickName, emailJoin, join, getKakaoAuthCode }