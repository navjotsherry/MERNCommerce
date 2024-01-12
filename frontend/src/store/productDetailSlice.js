import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import serverUrl from "../url";

export const fetchProductDetail = createAsyncThunk("getProductDetail", async(_id)=>{
    const data = await fetch(`${serverUrl}/api/v1/product/${_id}`)
    return data.json()
})

export const createAreview = createAsyncThunk("createReview",async (newReviewData)=>{
    const data = await fetch(`${serverUrl}/api/v1/productReview/${newReviewData.id}`,{
        method:"PUT",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials:"include",
        body:JSON.stringify(newReviewData)
    })
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
            state.err = action.error
        })
        builder.addCase(createAreview.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetail = action.payload.currentProduct
        })
        builder.addCase(createAreview.pending,(state,action)=>{
            state.productDetail = action.payload
            state.isLoading = true
        })
        builder.addCase(createAreview.rejected,(state,action)=>{
            state.isLoading = false
            state.productDetail = action.payload
        })
    }
})

export const {clearState} = productDetail.actions

export default productDetail.reducer