import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import serverUrl from "../url";

export const fetchProductsfunc = createAsyncThunk("products/fetchProducts", async({keyword="",currentPage=1,productsPerPage,productValueRange=[0,5000],category=""})=>{
    const data = await fetch(`${serverUrl}/api/v1/products?keyword=${keyword ? keyword :''}&page=${currentPage? currentPage : "1"}&limit=${productsPerPage ? productsPerPage : ""}&price[gte]=${productValueRange ? productValueRange[0] : ""}&price[lte]=${productValueRange ? productValueRange[1]: ""}${category? `&category=${category}`: ""}`)
    const jsonData = await data.json()
    return jsonData
})

export const fetchProductConstants = createAsyncThunk("product/productCategories",async()=>{
    const data = await fetch(`${serverUrl}/api/v1/getProductCategories`)
    return data.json()
})

const productSlice = createSlice({
    name:"products",
    initialState:{
        isLoading:false,
        productCategories:null,
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
            state.err= action.error
        });
        builder.addCase(fetchProductsfunc.pending,(state,action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchProductConstants.rejected,(state,action)=>{
            state.isLoading=false
            state.productCategories=action.payload
        })
        builder.addCase(fetchProductConstants.pending,(state,action)=>{
            state.isLoading=true
            state.productCategories=null
        })
        builder.addCase(fetchProductConstants.fulfilled,(state,action)=>{
            state.isLoading=false
            state.productCategories=action.payload.productConstants
        })
    }
})


// export const {addProducts} = productSlice.actions

export default productSlice.reducer