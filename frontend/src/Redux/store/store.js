import { configureStore } from '@reduxjs/toolkit'

import foodsReducer from '../slices/foodSlice.js'
import shoppingReducer, { getTotals } from '../slices/shoppingSlice.js'
import userReducer from '../slices/userSlice'
import restaurantsReducer from '../slices/restaurantsSlice'
import orderSlice from '../slices/ordersSlice'
import shopReducer from '../slices/shopSlice'

const store = configureStore({
    reducer:{
        foods: foodsReducer,
        shopping: shoppingReducer,
        user: userReducer,
        restaurants: restaurantsReducer,
        orders: orderSlice,
<<<<<<< HEAD
=======
        shop: shopReducer
>>>>>>> 472ed4acf89b7d6a96cd760a8af9fd29d70f4bf2
    }
})
store.dispatch(getTotals())

export default store;