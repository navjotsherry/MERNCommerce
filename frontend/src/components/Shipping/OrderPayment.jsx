import React from 'react'
import {CardCvcElementComponent, CardCvcElement, CardNumberElement, Elements} from '@stripe/react-stripe-js'
import ShippingStepper from './ShippingStepper'

const OrderPayment = () => {
  return (
    <>
    <ShippingStepper activeStep={2}/>
    <div className="">
    <Elements>
        <CardNumberElement/>
    </Elements>
    </div>
    </>
  )
}

export default OrderPayment