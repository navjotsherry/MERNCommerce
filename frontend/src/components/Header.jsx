import { Link } from 'react-router-dom'
import logo from '../amazon.png'
import {RxHamburgerMenu} from 'react-icons/rx'
import {RiSearchLine} from 'react-icons/ri'
import {MdOutlineShoppingCart, MdLogin} from 'react-icons/md'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'


const Header = ()=>{

    const [isHamOpen, setHamOpen] = useState(false)
    const [isSearching, setSearching] = useState(false)

    useEffect(()=>{
        window.addEventListener('resize', ()=>{
            setHamOpen(false)
            setSearching(false)
        })
        return ()=>{
            window.removeEventListener('resize', ()=>{
                setHamOpen(false)
                setSearching(false)
            })
        }
    },)

    const handleSearch = ()=> {
        setSearching(!isSearching)
        setHamOpen(false)
    }
    const HamburgerClick = () =>{
        setHamOpen(!isHamOpen)
    }
    
    return (
    <>
        <nav className='flex content-between p-1 items-center justify-between md:p-3 border sticky top-0 z-20 w-full shadow-lg rounded-b-lg border-white border-3 backdrop-blur-sm'>
            <Link to='/'><img className={`${isSearching ? "hidden" : " "} w-32`}  src={logo}/></Link>
            <div className={`${isSearching?"flex":"hidden"} border border-black rounded-md active:border-primary focus-within:border-primary p-2 md:flex lg:w-56 xl:w-auto items-center`}><SearchBar setSearching={setSearching}/></div>
            <div className='flex items-center justify-between'>
                <div onClick={handleSearch} className={`${isSearching ? "hidden": " "} border p-4 mx-4 border-black rounded-md cursor-pointer bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 md:hidden`} ><RiSearchLine/></div>
                <div onClick={HamburgerClick} className={`${isSearching ? "hidden": " "} border p-4 cursor-pointer border-black rounded-md bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 lg:hidden`}><RxHamburgerMenu/></div>
                <ul className={`${isHamOpen?'flex flex-col':'hidden'} absolute top-20 right-8 lg:relative lg:top-0 lg:left-0 lg:flex lg:justify-between lg:content-between lg:space-x-4 lg:h-12`}>
                    <Link to='/'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Home</div></li></Link>
                    <Link to='/products'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Products</div></li></Link>
                    <Link to='/about'> <li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">About</div></li></Link>
                    <Link to='/contact'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-4 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Contact Us</div></li></Link>
                </ul>
                <Link to='/cart'><li className={`${isSearching ? "hidden" : " "} cursor-pointer text-primary p-2 ml-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}><div className="mx-auto text-2xl p-2 flex items-center"><MdOutlineShoppingCart/><div className="text-sm text-black relative bottom-3 right-1 bg-primary md:p-[0.07rem] rounded-full font-bold">27</div></div></li></Link>
                <Link to='/login'><li className={`${isSearching ? "hidden" : " "} cursor-pointer text-primary p-2 ml-3 mr-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}><div className="mx-auto text-2xl p-2 flex items-center"><MdLogin/></div></li></Link>

            </div>
        </nav>
    </>
    )
}


export default Header