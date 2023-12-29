import React , {useRef} from 'react'
import {CardCvcElement, CardNumberElement,CardExpiryElement, useElements, useStripe} from '@stripe/react-stripe-js'
import { FaRegCreditCard } from "react-icons/fa6";
import { MdVpnKey, MdOutlineEvent } from "react-icons/md";
import {useSelector, useDispatch} from 'react-redux'
import { newOrderPlace } from '../../store/Orders';
import Toaster from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { clearCart } from '../../store/cartSlice';

const CardPaymentForm = ({clientSecret}) => {
    const paymentData = JSON.parse(sessionStorage.getItem("paymentData")) 
    const elements = useElements()
    const stripe = useStripe()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const payBtn = useRef(null)
    const user = useSelector((state)=> state.user.user.user)
    const shippingInfo = JSON.parse(localStorage.getItem("cart")).shippingInfo
    const cartItems = JSON.parse(localStorage.getItem("cart")).cartItems

    console.log(shippingInfo)
    const submitHandler = async (e) =>{
        e.preventDefault()
        if(!stripe || !elements) return
        payBtn.current.disabled = true
        try {
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method:{
                    card : elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.name,
                        email:user.email,
                        address:{
                        line1:shippingInfo.address,
                        city:shippingInfo.city,
                        state:shippingInfo.state,
                        country:shippingInfo.country
                        
                    }
                }
                }
                

            })
            payBtn.current.disabled = false
            if(result.error){
                Toaster.error(result.error.message,{id:"Payment Error"})
            }else{
              if(result.paymentIntent.status === "succeeded"){
                const orderDetails = {
                    "shippingInfo": {
                        "address":shippingInfo.address,
                        "city":shippingInfo.city,
                        "state":shippingInfo.state,
                        "country":shippingInfo.country,
                        "pinCode":555555,
                        "phoneNumber": Number(shippingInfo.phone)
                    },
                     "orderItems": cartItems, 
                     "paymentInfo": {
                         "status":"Paid",
                         "id":result.paymentIntent.id
                         }, 
                     "itemsPrice": paymentData.subTotal,
                     "taxPrice": paymentData.tax, 
                     "shippingPrice": paymentData.shippingCharges, 
                     "totalPrice": paymentData.totalAmount
                }
                dispatch(newOrderPlace(orderDetails))
                dispatch(clearCart())
                navigate('/paymentSuccess') 
              }else{
                Toaster.error("An unexpected error occured while doing payment",{id:"Payment Error"})
              }
               
            }
        } catch (error) {
            payBtn.current.disabled = false
        }
      }

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center justify-center rounded-md mt-4 w-64 mx-auto p-4'>
      <div className="flex items-center border rounded-sm border-primary group-focus-within:border-black p-2">
        <FaRegCreditCard className='mr-2 group-focus-within:text-primary'/>
        <CardNumberElement className='w-48 p-2'/>
      </div>
      <div className="flex items-center my-6 border rounded-sm border-primary focus:ring focus:ring-violet-300 focus-within:border-black p-2">
        <MdVpnKey className='mr-2'/>
        <CardCvcElement className='w-48 p-2'/>
      </div>
      <div className="flex items-center border rounded-sm border-primary focus-within:border-black p-2">
        <MdOutlineEvent className='mr-2' />
        <CardExpiryElement className='w-48 p-2'/>
      </div>
      <button ref={payBtn} className='mt-6 text-lg rounded-lg bg-black text-primary hover:bg-primary hover:text-black duration-300 disabled:bg-gray-500 disabled:text-black focus-within:border-black p-4'>Proceed to Pay ${paymentData.totalAmount}</button>
    </form>
  )
}

export default CardPaymentForm