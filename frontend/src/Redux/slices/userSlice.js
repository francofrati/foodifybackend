import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    user: {
        name:'',
        email:'',
        username:''
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserCreds(state, action) {
            state.user = action.payload
        }
    }
})

export const { 
    getUserCreds
 } = userSlice.actions

export default userSlice.reducer