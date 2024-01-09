import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    adminProducts: [],
    newCreatedProduct:null,
    deletedProduct:null,
    allOrders:null
}

export const adminProductSlice = createAsyncThunk("admin/fetchProducts", async ()=>{
    const data = await fetch("http://localhost:5000/api/v1/adminproducts",{
        credentials:"include"
    })
    return data.json()
})

export const adminDeleteProductSlice = createAsyncThunk("admin/deleteProducts", async (id)=>{
    const data = await fetch(`http://localhost:5000/api/v1/product/del/${id}`,{
        method:"DELETE",
        credentials:"include"
    })
    return data.json()
})

export const adminAddProductSlice = createAsyncThunk("admin/addProduct", async (productInfo)=>{
    const data = await fetch("http://localhost:5000/api/v1/new/product",{
        method:"POST",
        credentials:"include",
        body:productInfo

    })
    return data.json()
})

export const adminAllOrders = createAsyncThunk("admin/allOrders" , async ()=>{
    const data = await fetch("http://localhost:5000/api/v1/allOrders",{
        credentials:"include"
    })
    return data.json()
})

export const adminSlice = createSlice({
    name:"adminData",
    initialState,

    extraReducers:(builder)=>{
        builder.addCase(adminProductSlice.fulfilled,(state,action)=>{
            state.isLoading=false
            state.adminProducts= action.payload
        }).addCase(adminProductSlice.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(adminProductSlice.rejected,(state,action)=>{
            state.adminProducts=action.payload
            state.isLoading=false
        })
        builder.addCase(adminAddProductSlice.fulfilled,(state,action)=>{
            state.isLoading=false
            state.newCreatedProduct= action.payload
        }).addCase(adminAddProductSlice.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(adminAddProductSlice.rejected,(state,action)=>{
            state.newCreatedProduct=action.payload
            state.isLoading=false
        })
        builder.addCase(adminDeleteProductSlice.fulfilled,(state,action)=>{
            state.isLoading=false
            state.deletedProduct = action.payload
        }).addCase(adminDeleteProductSlice.pending,(state,action)=>{
            state.isLoading=true
        }).addCase(adminDeleteProductSlice.rejected,(state,action)=>{
            state.deletedProduct = action.payload
            state.isLoading=false
        })
        builder.addCase(adminAllOrders.pending,(state,action)=>{
            state.isLoading = true
            state.allOrders = null
        }).addCase(adminAllOrders.rejected,(state,action)=>{
            state.isLoading = false
            state.allOrders = action.payload
        }).addCase(adminAllOrders.fulfilled,(state,action)=>{
            state.isLoading= false
            state.allOrders = action.payload
        })
    }
})

export default adminSlice.reducer