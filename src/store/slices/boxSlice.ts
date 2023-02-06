import { createSlice } from "@reduxjs/toolkit";

const boxSlice = createSlice({
    name: "box",
    initialState: {
        count: 0,
        hasNext: false,
        list: []
    },
    reducers: {
        setBox(state, action) {
            return {
                ...state,
                count: action.payload.count,
                hasNext: action.payload.hasNext,
                list: action.payload.list,
            }
        },
        addBox(state, action) {
            return {
                ...state,
                count: action.payload.count,
                hasNext: action.payload.hasNext,
                list: state.list.concat(action.payload.list),
            }
        }
    }
})

export default boxSlice;
export const { setBox, addBox } = boxSlice.actions;