import { createSlice } from '@reduxjs/toolkit'

const modal = createSlice({
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

export default modal
export const { changeModal } = modal.actions