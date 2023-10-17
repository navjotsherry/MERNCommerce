import {GiMouse} from 'react-icons/gi'
import MetaData from '../utils/MetaData'
import FeaturedProducts from './FeaturedProducts'

const Home = () => {
  
  return (
    <>
    <MetaData title="Home"/>
    <div className='h-[88vh] flex flex-col justify-center items-center clip-your-needful-style bg-gradient-to-r from-primary to-yellow-300'>
      <h1 className='text-3xl'>Welcome to E-Commerce</h1>
      <h1 className='text-2xl mt-4'>Get Amazing products Below</h1>
      <h1  className='text-xl border border-1 rounded-md flex items-center mt-6 p-2 border-black hover:bg-black hover:text-primary hover:cursor-pointer transition-all duration-300'><GiMouse/> Scroll</h1>
    </div>
    <div className='text-4xl text-center underline m-14'>Featured Products</div>
      <FeaturedProducts/>
    </>
  )
}

export default Home




