import {configureStore} from '@reduxjs/toolkit'
import productSlice from './productSlice'
import productDetailSlice from './productDetailSlice.js'
import userSlice from './userSlice'
import cartSlice from './cartSlice'
import newOrderSlice from './newOrder.js'


const store = configureStore({
    reducer:{
        products: productSlice,
        product : productDetailSlice,
        user: userSlice,
        cart: cartSlice,
        newOrder : newOrderSlice
    }
})


export default store