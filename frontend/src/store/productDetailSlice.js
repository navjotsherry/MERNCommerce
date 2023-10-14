import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductDetail = createAsyncThunk("getProductDetail", async(_id)=>{
    const data = await fetch(`http://localhost:5000/api/v1/product/${_id}`)
    return data.json()
})


const productDetail = createSlice({
    name:"product",
    initialState:{
        isLoading : false,
        productDetail : null,
        err : null
    },
    reducers:{
        clearState : (state,action) => {
            state.isLoading=false
            state.productDetail = null
            state.err = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProductDetail.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetail = action.payload.productDetail
        });
        builder.addCase(fetchProductDetail.pending,(state,action)=>{
            state.isLoading = true
        });
        builder.addCase(fetchProductDetail.rejected,(state,action)=>{
            state.isLoading = false
            state.err = action.payload
        })
    }
})

export const {clearState} = productDetail.actions

export default productDetail.reducer