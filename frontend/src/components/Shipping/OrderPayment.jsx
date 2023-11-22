import React from 'react'
import {CardCvcElementComponent, CardCvcElement, CardNumberElement} from '@stripe/react-stripe-js'
import ShippingStepper from './ShippingStepper'

const OrderPayment = () => {
  return (
    <>
    <ShippingStepper activeStep={2}/>
    <div className="">
    <CardNumberElement/>
    </div>
    </>
  )
}

export default OrderPayment