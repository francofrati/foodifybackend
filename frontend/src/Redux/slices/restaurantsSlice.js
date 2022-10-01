import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: [],
    renderedRestaurants: [],
    restaurant: null
}

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        getAllRestaurants(state, action) {
            state.restaurants = action.payload
            state.renderedRestaurants = action.payload
        },
        getOneRestaurant(state, action) {
            state.restaurant = action.payload
        },
        cleanRestaurantState(state) {
            state.restaurant = null
        },
        //---SORT Y FILTRADO DE RESTAURANTES---
        filterRestaurants(state, { payload }) {
            switch (payload) {
                case 'RATING':
                    const sorted = state.renderedRestaurants.sort((a, b) => b.rate - a.rate)
                    state.renderedRestaurants = sorted
                    break
                case 'PLUS':
                    const plusRestaurants = state.renderedRestaurants.filter((r) => r.plus === true)
                    state.renderedRestaurants = plusRestaurants
                    break
                case 'DELIVERY':
                    const deliveryRestaurants = state.renderedRestaurants.filter((r) => r.delivery === true)
                    state.renderedRestaurants = deliveryRestaurants
                    break
                case 'CLOSE':
                    //CALCULAR DISTANCIA DE USUARIO ACTUAL CON UBICACION DE RESTAURANTE Y DEVOLVER
                    //SERIA UN SORT
                    break
                case 'ONLINEPAYMENT':
                    const onlinePaymentRestaurants = state.renderedRestaurants.filter((r) => r.online_payment === true)
                    state.renderedRestaurants = onlinePaymentRestaurants
                    break
                case typeof payload === 'object':
                    const filtered = state.renderedRestaurants.filter((r) => r.types.include(payload.diet))
                    state.renderedRestaurants = filtered
                    break
                default:
                    return state.renderedRestaurants
            }
        }
    }
})

export const {
    getAllRestaurants,
    getOneRestaurant,
    cleanRestaurantState,
    filterRestaurants
} = restaurantsSlice.actions

export default restaurantsSlice.reducer