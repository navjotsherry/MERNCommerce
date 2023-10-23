import { Link } from 'react-router-dom'
import logo from '../amazon.png'
import {RxHamburgerMenu} from 'react-icons/rx'
import {RiSearchLine} from 'react-icons/ri'
import {MdOutlineShoppingCart, MdLogin} from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import UserOptions from './UserOptions'

const Header = ()=>{

    const [isHamOpen, setHamOpen] = useState(false)
    const [isUserOptionsOpen, setUserOptionsOpen] = useState(false)
    const [isSearching, setSearching] = useState(false)
    const [WindowWidth,setWindowWidth] = useState()

    const {user} = useSelector(state=> state.user)

    useEffect(()=>{
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setHamOpen(false)
            setSearching(false)
            setUserOptionsOpen(false)
        }
      
        setWindowWidth(window.innerWidth)

        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
        },[])

    const handleSearch = ()=> {
        setSearching(!isSearching)
        setHamOpen(false)
        setUserOptionsOpen(false)
    }
    const HamburgerClick = () =>{
        setHamOpen(!isHamOpen)
        setUserOptionsOpen(false)
    }

    const UserOptionsOpenClick = () =>{
        setUserOptionsOpen(!isUserOptionsOpen)
        setHamOpen(false)
    }
       
    return (
    <>
        <nav className='flex content-between p-1 items-center justify-between md:p-3 border sticky top-0 z-20 w-full shadow-lg rounded-b-lg border-white border-3 backdrop-blur-sm'>
            <Link to='/'><img className={`${isSearching ? "hidden" : " "} w-32`}  src={logo}/></Link>
            <div className={`${isSearching?"flex my-5":"hidden"} border border-black rounded-md active:border-primary focus-within:border-primary p-2 lg:flex lg:w-56 xl:w-auto items-center`}><SearchBar setSearching={setSearching}/></div>
            <div className='flex items-center justify-between'>
                <div onClick={handleSearch} className={`${isSearching ? "hidden": " "} border p-4 mx-4 border-black rounded-md cursor-pointer bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 lg:hidden`} ><RiSearchLine/></div>
                <div onClick={HamburgerClick} className={`${isSearching ? "hidden": " "} border p-4 cursor-pointer border-black rounded-md bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 lg:hidden`}><RxHamburgerMenu/></div>
                <ul className={`${isHamOpen?'flex flex-col':'hidden'} absolute top-20 right-20 lg:relative lg:top-0 lg:left-0 lg:flex lg:justify-between lg:content-between lg:space-x-4 lg:h-12`}>
                    <Link to='/'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Home</div></li></Link>
                    <Link to='/products'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Products</div></li></Link>
                    <Link to='/about'> <li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">About</div></li></Link>
                    {WindowWidth<1024 && <Link to='/cart'>
                        <li className={`${isSearching || !isHamOpen ? "hidden lg:hidden" : ""} cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                            <div className="mx-auto text-2xl py-1 flex items-center">
                                Cart
                                <div className="text-sm text-black relative bottom-[0.85rem] bg-primary md:p-1 rounded-full font-bold">27</div>
                            </div>
                        </li>
                    </Link>}
                    <Link to='/contact'><li onClick={() =>{setHamOpen(false)}} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:ml-0 lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Contact</div></li></Link>
                </ul>
                <Link to='/cart'>
                    <li className={`${isSearching || !isHamOpen ? "hidden lg:flex" : ""} cursor-pointer hidden text-primary p-2 ml-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                        <div className="mx-auto text-2xl p-2 flex items-center">
                            <MdOutlineShoppingCart/>
                            <div className="text-sm text-black relative bottom-3 right-1 bg-primary md:p-[0.07rem] rounded-full font-bold">27</div>
                        </div>
                    </li>
                </Link>
                {user?.user ? <UserOptions isSearching={isSearching} isUserOptionsOpen={isUserOptionsOpen} UserOptionsOpenClick={UserOptionsOpenClick}/>
                : <Link to='/login'>
                        <li className={`${isSearching ? "hidden" : " "} cursor-pointer text-primary p-2 ml-3 mr-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                            <div className="mx-auto text-2xl p-2 flex items-center">
                                <MdLogin/>
                            </div>
                        </li>
                    </Link>}

            </div>
        </nav>
    </>
    )
}


export default Header