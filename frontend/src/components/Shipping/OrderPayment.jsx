import React from 'react'
import {CardCvcElementComponent, CardCvcElement, CardNumberElement,PaymentElement, Elements} from '@stripe/react-stripe-js'
import ShippingStepper from './ShippingStepper'
import {loadStripe} from '@stripe/stripe-js'

const OrderPayment = ({stripeApiKey}) => {

  const stripePromise = loadStripe(stripeApiKey)
  const stripeOptions = {
    clientSecret: stripeApiKey,
  }
  return (
    <>
    <ShippingStepper activeStep={2}/>
    <div className="">
    <Elements stripe={stripePromise} options={stripeOptions}>
    <form>
      <div className="">
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