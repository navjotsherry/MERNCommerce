import {configureStore} from '@reduxjs/toolkit'
import productSlice from './productSlice'
import productDetailSlice from './productDetailSlice.js'
import userSlice from './userSlice'
import cartSlice from './cartSlice'


const store = configureStore({
    reducer:{
        products: productSlice,
        product : productDetailSlice,
        user: userSlice,
        cart: cartSlice
    }
})


export default store