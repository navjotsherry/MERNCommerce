import { Link } from 'react-router-dom'
import logo from '../amazon.png'
import {RxHamburgerMenu} from 'react-icons/rx'
import { useState } from 'react'


const Header = ()=>{

    const [isHamOpen, setHamOpen] = useState(false)

    const HamburgerClick = () =>{
        setHamOpen(!isHamOpen)
    }
    
    return (
    <>
        <div className='h-22 bg-white'></div>
        <nav className='flex content-between items-center justify-between p-3 border sticky top-0 z-10 w-full rounded-b-lg border-white border-3 backdrop-blur-sm'>
            <Link to='/'><img className='w-32' src={logo}/></Link>
            <div>
                <div onClick={HamburgerClick} className='border border-black rounded-md bg-black p-2 text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 md:hidden '><RxHamburgerMenu/></div>
                <ul className={`${isHamOpen?'flex flex-col':'hidden'} absolute top-20 right-8 md:relative md:top-0 md:left-0 md:flex md:justify-between md:content-between md:space-x-4 md:h-12`}>
                    <Link to='/'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Home</li></Link>
                    <Link to='/products'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Products</li></Link>
                    <Link to='/about'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>About</li></Link>
                    <Link to='/contact'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Contact Us</li></Link>
                    <Link to='/cart'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Cart</li></Link>
                </ul>
            </div>
        </nav>
    </>
    )
}


export default Header