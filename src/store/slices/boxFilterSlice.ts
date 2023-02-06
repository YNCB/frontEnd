import { createSlice } from "@reduxjs/toolkit"

const boxFilterSlice = createSlice({
    name: "boxFilter",
    initialState: {
        countView: null,
        lastLikeNum: null,
        lastPostId: null,
        lastReplyNum: null,
        searchTitle: "",
        language: "",
        orderKey: "latest",
        tags: [],
        type: ""
    },
    reducers: {
        initBoxFilter(state) {
            return {
                ...state,
                countView: null,
                lastLikeNum: null,
                lastPostId: null,
                lastReplyNum: null,
                searchTitle: "",
                language: "",
                orderKey: "latest",
                tags: [],
                type: ""
            }
        },
        setBoxFilter(state, action) {
            return {
                ...state,
                lastPostId: null,
                [action.payload.key]: action.payload.value,
            }
        },
        updateLastPostId(state, action) {
            return {
                ...state,
                lastPostId: action.payload
            }
        },
    }
})

export default boxFilterSlice;
export const { initBoxFilter, setBoxFilter, updateLastPostId } = boxFilterSlice.actions;