import { configureStore } from '@reduxjs/toolkit'

import foodsReducer from '../slices/foodSlice.js'
import userReducer from '../slices/userSlice'
import restaurantsReducer from '../slices/restaurantsSlice'

const store = configureStore({
    reducer:{
        foods: foodsReducer,
        user: userReducer,
        restaurants: restaurantsReducer
    }
})

export default store;