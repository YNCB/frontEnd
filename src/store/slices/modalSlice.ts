import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        page: 0
    },

    reducers: {
        changeModal(state, action) {
            return {
                ...state,
                page: action.payload
            }

        }
    }
})

export default modalSlice
export const { changeModal } = modalSlice.actions