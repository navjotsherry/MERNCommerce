import orderSchema from "../config/db/orderSchema.js";
import ErrorHandler from '../utils/ErrorHandler.js'
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";

//Create an Order
export const createOrder = asyncAwaitErrorHandler(async(req,res,next)=>{
    const {shippingInfo, orderItems, paymentInfo, paidAt,itemsPrice,taxPrice, shippingPrice, totalPrice } = req.body

    const userId = req.user._id
    
    const order = await orderSchema.create({
        shippingInfo, orderItems, paymentInfo, paidAt,itemsPrice,taxPrice, shippingPrice, totalPrice, user:userId, paidAt:Date.now()
    })

    res.status(200).json({
        success:true,
        order
    })
})

//Delete an Order
export const deleteOrder = asyncAwaitErrorHandler( async(req,res,next)=>{
    const orderId = req.params.orderId

    const order = await orderSchema.findById(orderId)

    if(!order){
        return next(new ErrorHandler("Order not found", 400))
    }

    await order.remove()

    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})