import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const loginUserSlice = createAsyncThunk("loginSlice",async (authData)=>{
    const data = await fetch("http://localhost:5000/api/v1/login",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        credentials:"include",
        body: JSON.stringify(authData)
    })
    return data.json()
})

export const updateUserSlice = createAsyncThunk('updateUserProfile',async (updatedData)=>{
    const data = await fetch('http://localhost:5000/api/v1/updateProfile',{
        method:"PUT",
        credentials:"include",
        body:updatedData
    })
    return data.json()
})


export const logoutUserSlice = createAsyncThunk("logoutSlice",async ()=>{
    const data = await fetch("http://localhost:5000/api/v1/logout",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET",
        credentials:"include"
    })
    return data.json()
})


export const reloadUserSlice = createAsyncThunk("reloadUser", async ()=>{
    const data = await fetch('http://localhost:5000/api/v1/myProfile',{
      credentials:"include"
  })
    const resData = await data.json()
    return resData
  })

export const registerUser = createAsyncThunk("createUser", async (formData,{rejectWithValue})=>{
    try{
        const responseData = await fetch("http://localhost:5000/api/v1/register",{
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/formdata'
        //   },
        method:'POST',
        body:formData
    })
    return responseData.json()}catch(error){
        return rejectWithValue(error)
    }
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
            state.isAuthenticated = action.payload.success
        })
        .addCase(loginUserSlice.pending,(state,action)=>{
            state.user=null
            state.isLoading=true
        })
        .addCase(loginUserSlice.rejected,(state,action)=>{
            state.err=action.payload
            state.user=null
            state.isLoading=false
        })
        .addCase(registerUser.pending,(state,action)=>{
            state.user=null
            state.isLoading=true
            state.err = false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.user=null
            state.err = action.payload
            state.isLoading = false
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.user =action.payload
            state.err= null
            state.isLoading=false
            state.isAuthenticated = action.payload.success
        })
        .addCase(reloadUserSlice.fulfilled,(state,action)=>{
            state.err = null
            state.isLoading=false
            state.isAuthenticated = action.payload.success
            state.user = action.payload
        })
        .addCase(reloadUserSlice.rejected,(state,action)=>{
            state.err=action.payload
            state.isLoading = false
            state.user = null
        })
        .addCase(reloadUserSlice.pending,(state,action)=>{
            state.err = null
            state.user=null
            state.isLoading = true
        })
        .addCase(logoutUserSlice.fulfilled,(state,action)=>{
            state.err = null
            state.isLoading = null
            state.user = action.payload
            state.isAuthenticated = false
        })
        .addCase(logoutUserSlice.rejected,(state,action)=>{
            state.err = action.payload
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })
        .addCase(logoutUserSlice.pending,(state,action)=>{
            state.err = null
            state.user= null
            state.isAuthenticated =false
            state.isLoading = true
        })
    }
})

export const {logoutUser} = userSlice.actions

export default userSlice.reducer