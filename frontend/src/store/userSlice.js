import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export const loginUserSlice = createAsyncThunk("loginSlice",async (authData)=>{
    const data = await fetch("http://localhost:5000/api/v1/login",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(authData)
    })
    return data.json()
})

export const registerUser = createAsyncThunk("createUser", async (formData)=>{
    console.log(formData)
    const responseData = await fetch("http://localhost:5000/api/v1/register",{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method:'POST',
        body:JSON.stringify(formData)
    })
    return responseData.json()
})

export const userSlice = createSlice({
    name:"user",
    initialState:{
        isLoading:false,
        user:null,
        isAuthenticated:false,
        err:null
    },
    reducers:{
        logoutUser : (state,action)=>{
            state.isLoading=false
            state.user=null
            state.err=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUserSlice.fulfilled,(state,action)=>{
            state.user=action.payload
            state.err=null
            state.isLoading=false
        })
        builder.addCase(loginUserSlice.pending,(state,action)=>{
            state.user=null
            state.isLoading=true
        })
        builder.addCase(loginUserSlice.rejected,(state,action)=>{
            state.err=action.payload
            state.user=null
            state.isLoading=false
        })
        builder.addCase(registerUser.pending,(state,action)=>{
            state.user=null
            state.isLoading=true
            state.err = false
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.user=null
            state.err = action.payload
            state.isLoading = false
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.user =action.payload
            state.err= null
            state.isLoading=false
        })
    }
})

export const {logoutUser} = userSlice.actions

export default userSlice.reducer