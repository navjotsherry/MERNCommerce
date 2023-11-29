import React, { useEffect } from 'react'
import {CardCvcElementComponent, CardCvcElement, CardNumberElement,PaymentElement, Elements} from '@stripe/react-stripe-js'
import ShippingStepper from './ShippingStepper'
import {loadStripe} from '@stripe/stripe-js'

const OrderPayment = ({stripeApiKey}) => {

  const fetchClientSecret = async()=>{
    const data =await fetch('http://localhost:5000/api/v1/processPayment',{
      credentials:"include"
    })
    const jsonData = await data.json()
    console.log(jsonData)
  }

  const stripePromise = loadStripe(stripeApiKey)
  const stripeOptions = {
    clientSecret: "{{stripeApiKey}}",
  }

  useEffect(()=>{
    fetchClientSecret()
  },[])


  return (
    <>
    <ShippingStepper activeStep={2}/>
    <div className="">
    <Elements stripe={stripePromise} options={stripeOptions}>
    <form>
      <div className="w-20 border-2 border-red-800 h-14">
      <CardNumberElement/>
      </div>
      <PaymentElement />
      <button>Submit</button>
    </form>
    </Elements>
    </div>
    </>
  )
}

export default OrderPayment