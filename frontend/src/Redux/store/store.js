import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from '../slices/foodSlice.js'
import userReducer from '../slices/userSlice'

const store = configureStore({
    reducer:{
        foods: foodsReducer,
        user: userReducer
    }
})

export default store;