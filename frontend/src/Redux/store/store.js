import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from '../slices/foodSlice.js'

const store = configureStore({
    reducer:{
        foods: foodsReducer
    }
})

export default store;