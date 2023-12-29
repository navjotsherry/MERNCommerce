import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const newOrderPlace = createAsyncThunk("placeNewOrder", async(orderDetails) => {
    const orderData = await fetch("http://localhost:5000/api/v1/createOrder",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify(orderDetails)
    })
    return orderData.json()
})

export const fetchAllOrders = createAsyncThunk("fetchAllOrders", async(orderDetails) => {
    const orderData = await fetch("http://localhost:5000/api/v1/getMyOrders",{
        credentials:"include"
    })
    return orderData.json()
})

export const orderSlice = createSlice({
    name:"Orders",
    initialState:{
        newOrder: null,
        allOrders:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(newOrderPlace.fulfilled,(state,action)=>{
            state.newOrder = action.payload
        })
        builder.addCase(newOrderPlace.rejected,(state,action)=>{
            state.newOrder = action.payload
        })
        builder.addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.allOrders = action.payload.orders
        })
        builder.addCase(fetchAllOrders.rejected,(state,action)=>{
            state.allOrders = action.payload
        })
    }
})

export default orderSlice.reducer