import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsfunc = createAsyncThunk("fetchProducts", async()=>{
    const data = await fetch("http://localhost:5000/api/v1/products")
    const jsonData = await data.json()
    return jsonData
})

const productSlice = createSlice({
    name:"products",
    initialState:{
        isLoading:false,
        products:null,
        err:null
    },
    // reducers:{
    //     addProducts : (state,action) => {
    //         state.products.push(action.payload)
    //     }
    // },
    extraReducers: (builder)=>{
        builder.addCase(fetchProductsfunc.fulfilled,(state,action)=>{
            state.isLoading=false
            state.products = action.payload
        });
        builder.addCase(fetchProductsfunc.rejected, (state,action)=>{
            state.isLoading = false
            state.err= action.payload
        });
        builder.addCase(fetchProductsfunc.pending,(state,action)=>{
            state.isLoading = true
        })
    }
})


// export const {addProducts} = productSlice.actions

export default productSlice.reducer