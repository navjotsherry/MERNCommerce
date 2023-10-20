import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

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

export const userSlice = createSlice({
    name:"user",
    initialState:{
        isLoading:false,
        user:null,
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
    }
})

export const {logoutUser} = userSlice.actions

export default userSlice.reducer