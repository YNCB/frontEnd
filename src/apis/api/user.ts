import { instance, instanceWithAuth } from "../common/index";

interface emailLoginType {
    "email": string,
    "password": string
}

interface emailAuthType {
    email: string
}

interface emailJoinType {
    email: string,
    password: string
}

interface getKakaoAuthCodeType {
    params : {
        "code" : string
    }
}

interface validNickNameType {
    nickname: string
}

interface JoinType {
    email: string,
    job: string,
    main_lang: string,
    nickname: string,
    password: string,
    social_type: string
}

interface logoutType {
    headers: {
        Authorization: string
    }
}

interface putUserInfoType {
    job: string,
    main_lang: string,
    nickName: string
}

function emailLogin(userData: emailLoginType) {
    return instance.post('login', userData)
}

function emailAuth(userData: emailAuthType) {
    return instance.post('codebox/join/mailConfirm', userData)
}

function emailJoin(userData: emailJoinType) {
    return instance.post('codebox/join1', userData)
}

function getKakaoAuthCode(data: getKakaoAuthCodeType) {
    return instance.get('codebox/login/token/kakao', data)
}

function validNickName(userData: validNickNameType) {
    return instance.post('codebox/join/validNickName', userData)
}

function join(userData: JoinType) {
    return instance.post('codebox/join2', userData)
}

function logout(headers: logoutType) {
    return instance.get('codebox/logout', headers)
}

function getUserInfo() {
    return instanceWithAuth.get(`/codebox/setting`)
}

function putUserInfo(body: putUserInfoType) {
    return instanceWithAuth.put(`/codebox/setting`, body)
}

export { emailLogin, emailAuth, emailJoin, getKakaoAuthCode, validNickName, join, logout, getUserInfo, putUserInfo }