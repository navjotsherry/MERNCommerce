import React from 'react'
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <BsCheckCircleFill className='text-6xl sm:text-9xl mt-16 rounded-full bg-primary text-black'/>
      <div className="text-lg text-center sm:text-3xl mt-4 sm:mt-8">Order has been placed successfully. </div>
      <Link to='/myorders' className='text-lg text-primary text-center sm:text-3xl mt-2 sm:mt-3'>View Orders here</Link>
    </div>
  )
}

export default PaymentSuccess