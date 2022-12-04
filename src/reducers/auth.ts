import { createSlice } from "@reduxjs/toolkit"

const auth = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
        accessToken: null,
        expireTime: null
    },
    reducers:{

    }
})

export default auth