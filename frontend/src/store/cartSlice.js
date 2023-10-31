import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name:"cart",
    initialState : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
        cartItems:[],
        totalCartItems:0
    },
    reducers:{
        addProduct:(state,action)=>{
            const item = action.payload
            const isExist = state.cartItems.find(stateItem =>{
                return stateItem._id === item._id
            })
            if(isExist){
                if(isExist.quantity + item.quantity <= item.Stock){
                    isExist.quantity += item.quantity
                }else{
                    isExist.quantity = isExist.Stock
                }
            }else{
                state.cartItems.push(item)
            }
            state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
        increaseQuantity:(state,action)=>{
            const item = state.cartItems.find(item=>item._id === action.payload)
            if(item.quantity===item.Stock) return
            item.quantity +=1
            state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
        decreaseQuantity:(state,action)=>{
            const item = state.cartItems.find(item=>item._id === action.payload)
            if(item.quantity == 1) return
            item.quantity -= 1
            state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
    }
})


export const {addProduct,increaseQuantity,decreaseQuantity} = cartSlice.actions

export default cartSlice.reducer