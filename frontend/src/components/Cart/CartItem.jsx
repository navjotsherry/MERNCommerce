import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { increaseQuantity,decreaseQuantity } from '../../store/cartSlice.js'


const CartItem = ({product}) => {
  const dispatch = useDispatch()
  return (
    <div>
      <div className="flex border-b-2 py-4 px-2 border-gray-500">
        <div className="w-56 md:w-64">
          <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F61%2F70%2F61708115ff10932bd9bb771f3110089435ac345e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" alt="" />
        </div>
        <div className="m-4 w-7/12">
          <div className="text-md sm:text-xl">{product.name}</div>
          <div className="text-md sm:my-2 sm:text-xl md:my-4 font-bold">{product.price}</div>
          <div className="flex my-6 w-32">
              <button onClick={()=>dispatch(decreaseQuantity(product._id))} className="grid text-xl py-1 place-items-center bg-primary hover:bg-black hover:text-primary hover:duration-300 px-3 rounded-l-md md:text-3xl md:py-2">-</button>
                  <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-y-2 border-primary w-4/12 text-center' value={product.quantity} readOnly type="number" />
              <button onClick={()=>dispatch(increaseQuantity(product._id))} className="grid text-xl py-1 place-items-center hover:bg-black hover:text-primary hover:duration-300 bg-primary px-3 rounded-r-md md:text-2xl md:py-2">+</button>
          </div>
          <div className=" justify-start mt-12 md:mt-24 flex items-center md:justify-end w-full">
             <button className="button p-3 text-xl rounded-md flex items-center text-primary bg-black hover:bg-primary hover:text-black duration-300"><FaTrashAlt/> Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem