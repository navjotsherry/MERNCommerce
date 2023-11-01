import React from 'react'
import {TbShoppingCartOff} from 'react-icons/tb'

const EmptyCart = () => {
  return (
    <div className='grid lace-items-center h-[84vh]'>
        <div className="flex flex-col items-center justify-center">
            <div className="text-center items-center text-primary text-9xl my-4"><TbShoppingCartOff/></div>
            <div className="text-center text-4xl">Cart is Empty</div>
        </div>
       
    </div>
  )
}

export default EmptyCart