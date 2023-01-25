import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        page: 0,
        email: '',
        nickname: '',
        password: '',
        socialType: ''
    },

    reducers: {
        changeModal(state, action) {
            if (action.payload.page === 4) {
                return {
                    ...state,
                    page: action.payload.page,
                    email: action.payload.email,
                    nickname: action.payload.nickname,
                    password: action.payload.password,
                    socialType: action.payload.socialType,
                }
            }
            else {
                return {
                    ...state,
                    page: action.payload
                }
            }

        }
    }
})

export default modalSlice;
export const { changeModal } = modalSlice.actions;