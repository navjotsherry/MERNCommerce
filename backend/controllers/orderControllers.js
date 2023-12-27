import orderSchema from "../config/db/orderSchema.js";
import productSchema from "../config/db/productSchema.js";
import ErrorHandler from '../utils/ErrorHandler.js'
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";

//Create an Order
export const createOrder = asyncAwaitErrorHandler(async(req,res,next)=>{
    const {shippingInfo, orderItems, paymentInfo, paidAt,itemsPrice,taxPrice, shippingPrice, totalPrice } = req.body

    const userId = req.user._id
    
    const order = await orderSchema({
        shippingInfo, orderItems, paymentInfo, paidAt,itemsPrice,taxPrice, shippingPrice, totalPrice, user:userId, paidAt:Date.now()
    })


    let orderObject = {}

    if(orderItems){
        orderItems.forEach(product => {

            if(!orderObject[product._id]){
                orderObject[product._id] = Number(product.quantity)
            }else{
                orderObject[product._id] = orderObject[product._id] + Number(product.quantity)
            }
        });
    }

        const productsOrdered = Object.keys(orderObject);
        const quantityOrdered = Object.values(orderObject);
        console.log(productsOrdered,quantityOrdered)
        
        for(let i=0;i<productsOrdered.length;i++){
            const currentProduct = await productSchema.findById(productsOrdered[i])
            if(!currentProduct){
                return next(new ErrorHandler(`Product with Id: ${productsOrdered[i]} does not exist anymore`,404))
            }
            if(currentProduct.Stock<quantityOrdered[i]){
                return next(new ErrorHandler(`Stock for product ${currentProduct.name} is lesser than the ordered quantity`))
            }
            currentProduct.Stock -= quantityOrdered[i]
            await currentProduct.save()
        }
        await order.save()

        res.status(200).json({
        success:true,
        order
    })
})

// Get single order for the same logged in user
export const getSingleOrder= asyncAwaitErrorHandler(async(req,res,next)=>{
    const orderId = req.params.orderId
    const order = await orderSchema.findById(orderId)

    if(!order){
        return next(new ErrorHandler("No such order Found", 404))
    }

    if(req.user._id.toString() !== order.user.toString()){
        return next(new ErrorHandler("No such order found",404))
    }
    
    res.status(200).json({
        success:true,
        order
    })

})


//Get all the orders for logged in user
export const getAllMyOrders = asyncAwaitErrorHandler(async(req,res,next)=>{
    const userId = req.user._id.toString()
    const orders = await orderSchema.find({user:userId})
    res.status(200).json({
        success:true,
        orders
    })
})


//Admin Routes Below this
//Delete an Order
export const deleteOrder = asyncAwaitErrorHandler( async(req,res,next)=>{
    const orderId = req.params.orderId

    const order = await orderSchema.findById(orderId)

    if(!order){
        return next(new ErrorHandler("Order not found", 400))
    }

    let orderObject = {}

    const {orderItems, orderStatus} = order

    if(orderItems && orderStatus != "Delivered"){
        orderItems.forEach(product => {

            if(!orderObject[product.product]){
                orderObject[product.product] = Number(product.quantity)
            }else{
                orderObject[product.product] = orderObject[product.product] + Number(product.quantity)
            }
        });
    }

        const productsOrdered = Object.keys(orderObject);
        const quantityOrdered = Object.values(orderObject);
        
        for(let i=0;i<productsOrdered.length;i++){
            const currentProduct = await productSchema.findById(productsOrdered[i])
            currentProduct.Stock += quantityOrdered[i]
            await currentProduct.save()
        }


    await order.remove()

    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})

//Order's status update
export const updateOrderStatus = asyncAwaitErrorHandler(async(req,res,next)=>{
    const order = await orderSchema.findById(req.params.orderId)
    if(!order){
        return next(new ErrorHandler("Order not found",404))
    }

    order.orderStatus = req.body.orderStatus

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

//Get all the orders for admin
export const allOrders = asyncAwaitErrorHandler(async(req,res,next)=>{
    const order = await orderSchema.find()

    res.status(200).json({
        success:true,
        order
    })
})