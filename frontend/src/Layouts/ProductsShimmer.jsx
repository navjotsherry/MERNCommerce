import React from 'react'

const ProductsShimmer = () => {
  return (
    <div className="p-2 my-6 mx-auto sm:w-72 overflow-hidden md:mx-4 md:my-4 md:w-56 justify-center items-center border border-black shadow-sm hover:shadow-lg rounded-lg cursor-pointer duration-300 hover:scale-110">
            
            <div className='w-68 h-60 bg-gray-400 rounded-sm'>
            </div>
            <div className="flex justify-between items-center p-2">
                <div className="text-l bg-gray-400 w-12 h-5"></div>
                <div className="text-l text-primary bg-gray-400 w-12 h-5"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className='bg-gray-400 w-20 h-5'></div>
                <div className="text-sm bg-gray-400 w-12 h-5"></div>  
            </div>

        </div>
  )
}

export default ProductsShimmer