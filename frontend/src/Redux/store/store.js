import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from '../slices/foodSlice.js'
import shoppingReducer, { getTotals } from '../slices/shoppingSlice.js'
import userReducer from '../slices/userSlice'

const store = configureStore({
    reducer:{
        foods: foodsReducer,
        shopping: shoppingReducer,
        user: userReducer
    }
})
store.dispatch(getTotals())

export default store;