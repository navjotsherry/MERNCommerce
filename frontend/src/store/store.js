import {configureStore} from '@reduxjs/toolkit'
import productSlice from './productSlice'
import productDetailSlice from './productDetailSlice.js'
import userSlice from './userSlice'


const store = configureStore({
    reducer:{
        products: productSlice,
        product : productDetailSlice,
        user: userSlice
    }
})


export default store