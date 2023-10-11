import { Link } from 'react-router-dom'
import logo from '../amazon.png'
import {RxHamburgerMenu} from 'react-icons/rx'
import {MdOutlineShoppingCart} from 'react-icons/md'
import { useState } from 'react'


const Header = ()=>{

    const [isHamOpen, setHamOpen] = useState(false)

    const HamburgerClick = () =>{
        setHamOpen(!isHamOpen)
    }
    
    return (
    <>
        <div className='h-22 bg-white'></div>
        <nav className='flex content-between p-1 items-center justify-between md:p-3 border sticky top-0 z-10 w-full rounded-b-lg border-white border-3 backdrop-blur-sm'>
            <Link to='/'><img className='w-32' src={logo}/></Link>
            <div className='flex items-center justify-between'>
                <div onClick={HamburgerClick} className='border p-4 border-black rounded-md bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 md:hidden '><RxHamburgerMenu/></div>
                <ul className={`${isHamOpen?'flex flex-col':'hidden'} absolute top-20 right-8 md:relative md:top-0 md:left-0 md:flex md:justify-between md:content-between md:space-x-4 md:h-12`}>
                    <Link to='/'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Home</div></li></Link>
                    <Link to='/products'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Products</div></li></Link>
                    <Link to='/about'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">About</div></li></Link>
                    <Link to='/contact'><li className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Contact Us</div></li></Link>
                </ul>
                <Link to='/cart'><li className='cursor-pointer text-primary p-2 mx-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-2 flex items-center"><MdOutlineShoppingCart/><div className="text-sm text-black relative bottom-3 right-1 bg-primary md:p-[0.07rem] rounded-full font-bold">27</div></div></li></Link>

            </div>
        </nav>
    </>
    )
}


export default Header