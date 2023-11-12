import React from 'react'
import ShippingStepper from './ShippingStepper'

const ConfirmOrder = () => {
  return (
    <div>
        <ShippingStepper activeStep={1}/>
        <div className="flex flex-col">
            <div className="flex flex-col justify-between my-4 items-center">
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
    </div>
  )
}

export default ConfirmOrder