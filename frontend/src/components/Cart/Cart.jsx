import React from 'react'
import CartItem from './CartItem.jsx'
import { useSelector} from 'react-redux'
import EmptyCart from './EmptyCart.jsx'



const Cart = () => {
  const cart = useSelector(state=>state.cart)
  const subTotal = cart.cartItems.reduce((acc,item)=> acc+item.quantity*item.price,0)

  if(cart.cartItems.length === 0) return <EmptyCart/>

  return (
    <div className='flex flex-col-reverse md:flex-row'>
      <div className="p-4 md:w-8/12">
        {cart.cartItems.map(item=><CartItem key={item._id} product={item}/>)}
      </div>
      <div className="flex sticky top-24 bg-primary rounded-sm md:flex-col lg:flex-row md:bg-transparent justify-between p-4 md:w-4/12 md:justify-start lg:h-28 lg:items-center lg:justify-around ">
        <div className="text-center">
          <div className="text-xl">Subtotal ({cart.totalCartItems } Items): </div>
          <div className="text-2xl">${subTotal}</div>
        </div>
        <button className="text-2xl max-h-20 text-center p-4 rounded-md text-primary bg-black hover:bg-primary hover:text-black duration-300 ">Checkout</button>
      </div>
    </div>
  )
}

export default Cart