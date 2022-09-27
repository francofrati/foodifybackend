import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    foods: []
}

const foodSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {
        getFoods(state, action) {
            state.foods = action.payload
        }
    }
})

export const { 
    getFoods
 } = foodSlice.actions

export default foodSlice.reducer