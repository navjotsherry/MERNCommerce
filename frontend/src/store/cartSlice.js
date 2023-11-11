import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name:"cart",
    initialState : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
            cartItems:[],
            totalCartItems:0,
            shippingInfo:{}
        }
    ,
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
            let itemIndex = 0
            const item = state.cartItems.find((item,index)=>{
                if(item._id === action.payload){
                    itemIndex = index
                    return true
                }
                return false
            })
            if(item.quantity <= 1){
                state.cartItems.splice(itemIndex,1)
                state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
                localStorage.setItem("cart",JSON.stringify(state))
                return
            }
            item.quantity -= 1
            state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
        deleteCartItem:(state,action)=>{
            let itemIndex
            state.cartItems.find((item,index)=>{
                if(item._id === action.payload){
                    itemIndex = index
                    return true
                }
                return false
            })
            state.cartItems.splice(itemIndex,1)
            state.totalCartItems = state.cartItems.reduce((acc,item) => acc+item.quantity,0)
            localStorage.setItem("cart",JSON.stringify(state))
        },
        addShippingInfo : (state,action)=>{
            state.shippingInfo = action.payload
        }
    }
})


export const {addProduct,increaseQuantity,decreaseQuantity,deleteCartItem,addShippingInfo} = cartSlice.actions

export default cartSlice.reducer