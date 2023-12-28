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

export const newOrderSlice = createSlice({
    name:"newOrder",
    initialState:{
        orderDetails: null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(newOrderPlace.fulfilled,(state,action)=>{
            state.orderDetails = action.payload
        })
        builder.addCase(newOrderPlace.rejected,(state,action)=>{
            state.orderDetails = action.payload
        })
    }
})

export default newOrderSlice.reducer