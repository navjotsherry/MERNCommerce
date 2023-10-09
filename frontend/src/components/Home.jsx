import React from 'react'
import {GiMouse} from 'react-icons/gi'

const Home = () => {
  return (
    <>
    <div className='h-[88vh] flex flex-col justify-center items-center space-y-6 clip-your-needful-style bg-gradient-to-r from-primary to-yellow-300'>
      <h1 className='text-3xl'>Welcome to E-Commerce</h1>
      <h1 className='text-2xl'>Get Amazing products Below</h1>
      <h1 className='text-xl border border-1 rounded-md flex items-center p-2 border-black hover:bg-black hover:text-primary hover:cursor-pointer transition-all duration-300'><GiMouse/> Scroll</h1>


    </div>
    </>
  )
}

export default Home