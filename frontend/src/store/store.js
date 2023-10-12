import {configureStore} from '@reduxjs/toolkit'
import productSlice from './productSlice'
import productDetailSlice from './productDetailSlice.js'


const store = configureStore({
    reducer:{
        products: productSlice,
        product : productDetailSlice
    }
})


export default store