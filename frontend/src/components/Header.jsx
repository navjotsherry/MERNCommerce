// Import necessary dependencies and components for the Header component.
import { Link } from 'react-router-dom'
import logo from '../amazon.png'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiSearchLine } from 'react-icons/ri'
import { MdOutlineShoppingCart, MdLogin } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from './SearchBar'
import UserOptions from './UserOptions'

// Define the Header component as a functional component.
const Header = () => {
    // Initialize state variables using useState.
    const [isHamOpen, setHamOpen] = useState(false)
    const [isUserOptionsOpen, setUserOptionsOpen] = useState(false)
    const [isSearching, setSearching] = useState(false)
    const [WindowWidth, setWindowWidth] = useState()

    // Use the useSelector hook to access user and cart data from the Redux store.
    const { user } = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)

    // Set up an effect to handle window resizing and cleanup when the component unmounts.
    useEffect(() => {
        // Define a function to handle window resize events.
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setHamOpen(false);
            setSearching(false);
            setUserOptionsOpen(false);
        }
        // Initial window width setting and event listener registration.
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Cleanup by removing the event listener when the component unmounts.
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // Function to toggle the search state when the search icon is clicked.
    const handleSearch = () => {
        setSearching(!isSearching);
        setHamOpen(false);
        setUserOptionsOpen(false);
    }

    // Function to toggle the Hamburger menu when its icon is clicked.
    const HamburgerClick = () => {
        setHamOpen(!isHamOpen);
        setUserOptionsOpen(false);
    }

    // Function to toggle the user options dropdown when its icon is clicked.
    const UserOptionsOpenClick = () => {
        setUserOptionsOpen(!isUserOptionsOpen);
        setHamOpen(false);
    }

    // Render the Header component.
    return (
        <>
            <nav className='header flex content-between p-1 items-center justify-between md:p-3 border sticky top-0 z-20 w-full shadow-lg rounded-b-lg border-white border-3 backdrop-blur-sm'>
                <Link to='/'><img className={`${isSearching ? "hidden" : ""} w-32`} src={logo} /></Link>
                <div className={`${isSearching ? "flex my-5" : "hidden"} border border-black rounded-md active:border-primary focus-within:border-primary p-2 lg:flex lg:w-56 xl:w-auto items-center`}><SearchBar setSearching={setSearching} /></div>
                <div className='flex items-center justify-between'>
                    <div onClick={handleSearch} className={`${isSearching ? "hidden" : ""} border p-4 mx-4 border-black rounded-md cursor-pointer bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 lg:hidden`} ><RiSearchLine /></div>
                    <div onClick={HamburgerClick} className={`${isSearching ? "hidden" : ""} border p-4 cursor-pointer border-black rounded-md bg-black text-primary text-xl hover:bg-primary hover:text-black transition-all duration-300 lg:hidden`}><RxHamburgerMenu /></div>
                    <ul className={`${isHamOpen ? 'flex flex-col' : 'hidden'} absolute top-20 right-20 lg:relative lg:top-0 lg:left-0 lg:flex lg:justify-between lg:content-between lg:space-x-4 lg:h-12`}>
                        {/* Links to different pages with optional conditional rendering based on window width and other state variables. */}
                        <Link to='/'><li onClick={() => { setHamOpen(false) }} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Home</div></li></Link>
                        <Link to='/products'><li onClick={() => { setHamOpen(false) }} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Products</div></li></Link>
                        <Link to='/about'> <li onClick={() => { setHamOpen(false) }} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">About</div></li></Link>
                        {/* Render the Cart link with a dynamic badge for the cart item count. */}
                        {WindowWidth < 1024 && <Link to='/cart'>
                            <li onClick={() => setHamOpen(false)} className={`${isSearching || !isHamOpen ? "hidden lg:hidden" : ""} cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                                <div className="mx-auto text-2xl py-1 flex items-center">
                                    Cart
                                    <div className="text-sm text-black relative bottom-[0.85rem] bg-primary md:p-1 rounded-full font-bold">{cart.totalCartItems}</div>
                                </div>
                            </li>
                        </Link>}
                        <Link to='/contact'><li onClick={() => { setHamOpen(false) }} className='cursor-pointer text-primary h-full bg-black rounded-md my-2 px-2 py-0 flex items-center text-xl lg:ml-0 lg:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300'><div className="mx-auto text-2xl p-1">Contact</div></li></Link>
                    </ul>
                    {/* Render Cart and UserOptions components based on user authentication status. */}
                    <Link to='/cart'>
                        <li className={`${isSearching || !isHamOpen ? "hidden lg:flex" : ""} cursor-pointer hidden text-primary p-2 ml-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                            <div className="mx-auto text-2xl p-2 flex items-center">
                                <MdOutlineShoppingCart />
                                <div className="text-sm text-black relative bottom-3 right-1 bg-primary md:p-[0.07rem] rounded-full font-bold">{cart.totalCartItems}</div>
                            </div>
                        </li>
                    </Link>
                    {user?.user ? <UserOptions isSearching={isSearching} isUserOptionsOpen={isUserOptionsOpen} UserOptionsOpenClick={UserOptionsOpenClick} />
                        : <Link to='/login'>
                            <li className={`${isSearching ? "hidden" : ""} cursor-pointer text-primary p-2 ml-3 mr-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
                                <div className="mx-auto text-2xl p-2 flex items-center">
                                    <MdLogin />
                                </div>
                            </li>
                        </Link>}
                </div>
            </nav>
        </>
    )
}

// Export the Header component as the default export.
export default Header