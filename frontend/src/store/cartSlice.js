import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name:"cart",
    initialState : [],
    reducers:{
        addProduct:(state,action)=>{
            const item = action.payload
            const isExist = state.find(stateItem =>{
                return stateItem._id === item._id
            })
            console.log(isExist)
            state.push(action.payload)
        }
    }
})


export const {addProduct} = cartSlice.actions

export default cartSlice.reducer