import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
        accessToken: null,
        expireTime: null
    },
    reducers:{

    }
})

export default authSlice