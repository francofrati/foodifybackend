import { configureStore } from '@reduxjs/toolkit'
import foodsReducer from '../slices/foodSlice.js'
import shoppingReducer, { getTotals } from '../slices/shoppingSlice.js'

const store = configureStore({
    reducer:{
        foods: foodsReducer,
        shopping: shoppingReducer
    }
})
store.dispatch(getTotals())

export default store;