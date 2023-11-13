import React from 'react'
import ShippingStepper from './ShippingStepper'

const ConfirmOrder = () => {
  return (
    <div>
        <ShippingStepper activeStep={1}/>
        <div className="flex flex-col md:flex-row md:justify-between md:mx-3">
            <div className="">
                <div className="flex flex-col p-4">
                    <div className="text-3xl">Shipping Info</div>
                    <div className="flex my-2">
                        <div className="text-xl mr-4">Name:</div>
                        <div className="text-xl text-gray-700">Navjot Sherry</div>
                    </div>
                    <div className="flex my-2">
                        <div className="text-xl mr-4">Phone:</div>
                        <div className="text-xl text-gray-700">437-288-9469</div>
                    </div>
                    <div className="flex my-2">
                        <div className="text-xl mr-4">Address:</div>
                        <div className="text-xl text-gray-700">23,RollingWood Drive,Brampton</div>
                    </div>
                </div>
            </div>
            <div className=" border-t border-gray-600 md:border-l p-4 md:border-t-0">
                <div className="text-center mb-2 text-3xl">
                    Order Summary
                </div>
                <div className="flex justify-between">
                    <div className="text-md">Subtotal:</div>
                    <div className="text-md">4000</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-md">Shipping:</div>
                    <div className="text-md">0</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-md">GST:</div>
                    <div className="text-md">{4000*13/100}</div>
                </div>
                <div className="flex border-t border-gray-600 justify-between">
                    <div className="text-md">Total:</div>
                    <div className="text-md">{4000 + 0 + 4000*13/100}</div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ConfirmOrder