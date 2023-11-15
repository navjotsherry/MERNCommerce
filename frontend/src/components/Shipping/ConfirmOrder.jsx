// Importing necessary modules and components
import React from 'react';
import ShippingStepper from './ShippingStepper'; // Assuming this is a component for a shipping progress indicator
import { useSelector } from 'react-redux'; // Importing the useSelector hook from react-redux for accessing the Redux store

// Functional component for confirming an order
const ConfirmOrder = () => {
    // Accessing the 'cart' and 'shippingInfo' from the Redux store using useSelector
    const cart = useSelector(state => state.cart);
    
    // Calculating the subtotal of the items in the cart
    const subTotal = cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div>
            {/* Displaying a shipping progress indicator */}
            <ShippingStepper activeStep={1} />

            {/* Container for shipping information and order details */}
            <div className="flex flex-col mt-4 md:flex-row md:justify-between md:mx-3">
                {/* Section for displaying shipping information */}
                <div className="w-full">
                    <div className="flex flex-col p-4">
                        <div className="text-3xl mx-auto">Shipping Info</div>
                        {/* Displaying name, phone, and address from the shippingInfo in the cart */}
                        <div className="flex mt-2 mb-1">
                            <div className="text-xl mr-4">Name:</div>
                            <div className="text-xl text-gray-700">{cart.shippingInfo.phone}</div>
                        </div>
                        <div className="flex my-1">
                            <div className="text-xl mr-4">Phone:</div>
                            <div className="text-xl text-gray-700">{cart.shippingInfo.phone}</div>
                        </div>
                        <div className="flex my-1">
                            <div className="text-xl mr-4">Address:</div>
                            {/* Displaying address details from the shippingInfo in the cart */}
                            <div className="text-xl text-gray-700">{cart.shippingInfo.address},{cart.shippingInfo.city},{cart.shippingInfo.state},{cart.shippingInfo.country}</div>
                        </div>
                    </div>
                    {/* Displaying a list of items in the cart with their details */}
                    <div className="max-h-56 w-full overflow-y-scroll">
                        {cart.cartItems.map(item => (
                            <div key={item._id} className="flex p-3 justify-between items-center">
                                <div className='flex items-center'>
                                    <img className='w-24 md:w-32 mr-4' src={item.image} alt="ProductImage" />
                                    <div>{item.name}</div>
                                </div>
                                <div> {item.price} x {item.quantity} </div>
                                <div>$ {item.price * item.quantity}</div>
                            </div>
                        ))}
                    </div>
                    {/* Additional content can be added here */}
                </div>

                {/* Section for displaying the order summary */}
                <div className="border-t border-gray-600 md:border-l w-full p-4 md:w-1/3 md:border-t-0">
                    <div className="text-center mb-2 text-3xl">
                        Order Summary
                    </div>
                    {/* Displaying subtotal, shipping cost, GST, and total cost */}
                    <div className="flex justify-between">
                        <div className="text-md">Subtotal:</div>
                        <div className="text-md">{subTotal}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-md">Shipping:</div>
                        <div className="text-md">{subTotal < 100 ? 20 : 0}</div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-md">GST:</div>
                        <div className="text-md">{subTotal * 13 / 100}</div>
                    </div>
                    <div className="flex border-t border-gray-600 justify-between">
                        <div className="text-md">Total:</div>
                        <div className="text-md">$ {subTotal + 0 + subTotal * 13 / 100}</div>
                    </div>
                    {/* Button for proceeding to payment */}
                    <button className='mx-auto border-red-500 border w-full bg-primary text-black p-2 rounded-md my-3 text-xl hover:text-primary hover:bg-black duration-300'>Proceed to Pay $ {subTotal + 0 + subTotal * 13 / 100}</button>
                </div>
            </div>
        </div>
    );
}

// Exporting the ConfirmOrder component
export default ConfirmOrder;