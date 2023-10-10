import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[]
    },
    reducers:{
        addProducts : (state,action) => {
            state.products.push(action.payload)
        }
    }
})


export const {addProducts} = productSlice.actions

export default productSlice.reducer