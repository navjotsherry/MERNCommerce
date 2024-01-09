import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchAllOrders } from '../store/Orders'

const OrderDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const orders = useSelector(state=> state.Orders.allOrders)
    useEffect(()=>{
        if(!orders){
            dispatch(fetchAllOrders())
        }
    },[dispatch])
    if(!orders) return "Loading..."
    const id = params._id
    const currentOrder = orders.filter((order)=>order._id == id)[0]
    
    return (
    <>
    <div className="text-2xl m-3">Order Details for Order#<span className="text-primary">{currentOrder._id}</span></div>
    <div className='flex flex-col md:flex-row md:flex-1'>
        <div className='m-4 md:flex-[0.5]'>
            <div className="text-xl">Shipping details:</div>
            <div>{currentOrder.shippingInfo.address}</div>
            <div>{currentOrder.shippingInfo.city} {currentOrder.shippingInfo.state} {currentOrder.shippingInfo.country}</div>
            <div>Phone Number: {currentOrder.shippingInfo.phoneNumber}</div>
        </div>
        <div className='m-4 md:flex-[0.5]'>
            <div className="text-xl">Billing Details:</div>
            <div>Total Price: {currentOrder.itemsPrice}</div>
            <div>Shipping Price: {currentOrder.shippingPrice}</div>
            <div>Tax Price: {currentOrder.taxPrice}</div>
            <strong>Grand Total: ${currentOrder.totalPrice}</strong>
        </div>
    </div>
    <div className="text-2xl m-3">Ordered Items:</div>
    <div className="max-h-96 w-full overflow-y-scroll">
                        {currentOrder.orderItems.map(item => (
                            <div key={item._id} className="flex p-3 justify-between items-center">
                                <div className='flex items-center'>
                                    <Link target='_blank' to={`/productDetails/${item._id}`}><img className='w-24 md:w-32 mr-4' src={item.image} alt="ProductImage" /></Link>
                                    <div>{item.name}</div>
                                </div>
                                <div> {item.price} x {item.quantity} </div>
                                <div>$ {item.price * item.quantity}</div>
                            </div>
                        ))}
    </div>

    
    </>
  )
}

export default OrderDetails