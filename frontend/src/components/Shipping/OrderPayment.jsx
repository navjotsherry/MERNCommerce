import React, { useEffect, useState} from 'react'
import ShippingStepper from './ShippingStepper'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CardPaymentForm from './CardPaymentForm'
import serverUrl from '../../url'

const OrderPayment = ({stripeApiKey}) => {

  const [clientSecretState,setClientSecretState] = useState("")
  const shippingData = JSON.parse(sessionStorage.getItem("paymentData")) 


  const fetchClientSecret = async()=>{
    const data =await fetch(`${serverUrl}/api/v1/processPayment`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      credentials:"include",
      body:JSON.stringify(shippingData)
    })
    const jsonData = await data.json()
    setClientSecretState(jsonData.client_secret)
  }

  const stripePromise = loadStripe(stripeApiKey)
  const stripeOptions = {
    clientSecret: clientSecretState,
  }


  useEffect(()=>{
    fetchClientSecret()
  },[])

 

  return (
    <>
    <ShippingStepper activeStep={2}/>
    <div className="">
    {clientSecretState && <Elements stripe={stripePromise} options={stripeOptions}>
      <CardPaymentForm clientSecret={clientSecretState}/>
    </Elements>}
    </div>
    </>
  )
}

export default OrderPayment