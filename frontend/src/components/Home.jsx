import React from 'react'
import {GiMouse} from 'react-icons/gi'
import Product from './Product'
import MetaData from '../utils/MetaData'

const Home = () => {
  return (
    <>
    <MetaData title="Home"/>
    <div className='h-[88vh] flex flex-col justify-center items-center space-y-6 clip-your-needful-style bg-gradient-to-r from-primary to-yellow-300'>
      <h1 className='text-3xl'>Welcome to E-Commerce</h1>
      <h1 className='text-2xl'>Get Amazing products Below</h1>
      <h1 className='text-xl border border-1 rounded-md flex items-center p-2 border-black hover:bg-black hover:text-primary hover:cursor-pointer transition-all duration-300'><GiMouse/> Scroll</h1>
    </div>
    <div className='text-4xl text-center underline m-14'>Featured Products</div>
    <div className='m-8 flex flex-col items-center sm:flex-row sm:flex-wrap'>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
    
    </>
  )
}

export default Home