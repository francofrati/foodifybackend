import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: [],
    restaurant: null
}

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        getAllRestaurants(state, action) {
            state.restaurants = action.payload
        },
        getOneRestaurant(state, action) {
            state.restaurant = action.payload
        },
        cleanRestaurantState(state, action) {
            state.restaurant = null
        }
    }
})

export const {
    getAllRestaurants,
    getOneRestaurant,
    cleanRestaurantState
} = restaurantsSlice.actions

export default restaurantsSlice.reducer