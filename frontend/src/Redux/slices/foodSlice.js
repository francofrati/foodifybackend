import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "axios";
const initialState = {
    foods: [],
    foodsCopy: [],
    diets: [],
    searchEmpty: false,
    foodsRestaurant: []
}

const foodSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {
        getFoods(state, action) {
            state.foods = action.payload
            state.foodsCopy = action.payload
            
        },
        getDiets(state, action) {
            state.diets = action.payload
        },
        getFoodsRestaurant(state, action){
            state.foodsCopy = action.payload
            state.foodsRestaurant = action.payload
        },
        searchFood(state, action) {
            if(action.payload.length === 0) {

                state.searchEmpty = true;
                state.foods = action.payload
            }
            else {
                state.searchEmpty = false;
                state.foods = action.payload
            }
        },
        resetSearch(state, action) {
            state.foods = state.foodsCopy
            state.searchEmpty = false
        }
    }
})

export const { 
    getFoods,
    getDiets,
    searchFood,
    resetSearch,
    getFoodsRestaurant
 } = foodSlice.actions

export default foodSlice.reducer