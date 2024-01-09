import {configureStore} from '@reduxjs/toolkit'
import productSlice from './productSlice'
import productDetailSlice from './productDetailSlice.js'
import userSlice from './userSlice'
import cartSlice from './cartSlice'
import orderSlice from './Orders.js'
import adminSlice from './adminSlice.js'


const store = configureStore({
    reducer:{
        products: productSlice,
        product : productDetailSlice,
        user: userSlice,
        cart: cartSlice,
        Orders : orderSlice,
        admin : adminSlice
    }
})


export default store