import { createSlice } from "@reduxjs/toolkit";

const boxSlice = createSlice({
    name: "box",
    initialState: {
        count: 0,
        hasNext: false,
        isFollow: false,
        list: [],
        userId: 0
    },
    reducers: {
        initBox(state) {
            return {
                ...state,
                count: 0,
                hasNext: false,
                isFollow: false,
                list: [],
                userId: 0
            }
        },
        setBox(state, action) {
            return {
                ...state,
                count: action.payload.count,
                hasNext: action.payload.hasNext,
                isFollow: action.payload.isFollow,
                list: action.payload.list,
                userId: action.payload.userId
            }
        },
        addBox(state, action) {
            return {
                ...state,
                count: action.payload.count,
                hasNext: action.payload.hasNext,
                isFollow: action.payload.isFollow,
                list: state.list.concat(action.payload.list),
                userId: action.payload.userId
            }
        }
    }
})

export default boxSlice;
export const { initBox, setBox, addBox } = boxSlice.actions;