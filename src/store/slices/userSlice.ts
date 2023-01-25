import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user_Id: 0,
        nickname: '',
        authenticated: false,
        accessToken: null,
        refreshToken: null,
        my_session: null,
        expireTime: null,
    },
    reducers: {
        setUserInfo(state, action) {
            return {
                ...state,
                user_Id: action.payload.user_Id,
                nickname: action.payload.nickname,
                authenticated: true,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                my_session: action.payload.my_session,
                expireTime: action.payload.expireTime,
            }
        },
        initUserInfo(state) {
            return {
                ...state,
                user_Id: 0,
                nickname: '',
                authenticated: false,
                accessToken: null,
                refreshToken: null,
                my_session: null,
                expireTime: null,
            }
        },
        refreshUserInfo(state, action) {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                my_session: action.payload.my_session,
                expireTime: action.payload.expireTime,
            }
        }
    }
})

export default userSlice;
export const { setUserInfo, initUserInfo } = userSlice.actions;