import { Link } from 'react-router-dom'
import logo from '../amazon.png'

const Header = ()=>{
    
    return (
    <>
        <div className='h-22 bg-white'></div>
        <nav className='flex content-between items-center justify-between p-3 border sticky absolute top-0 z-10 w-full rounded-b-lg border-white border-3 backdrop-blur-sm'>
            <Link to='/'><img className='w-32' src={logo}/></Link>
            <div>
                <ul className='flex justify-between content-between space-x-4 h-12'>
                    <Link to='/'><li className='cursor-pointer text-primary h-full bg-black rounded-md px-2 py-0 flex items-center text-xl hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Home</li></Link>
                    <Link to='/products'><li className='cursor-pointer text-primary h-full bg-black rounded-md px-2 py-0 flex items-center text-xl hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Products</li></Link>
                    <Link to='/about'><li className='cursor-pointer text-primary h-full bg-black rounded-md px-2 py-0 flex items-center text-xl hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>About</li></Link>
                    <Link to='/contact'><li className='cursor-pointer text-primary h-full bg-black rounded-md px-2 py-0 flex items-center text-xl hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Contact Us</li></Link>
                    <Link to='/cart'><li className='cursor-pointer text-primary h-full bg-black rounded-md px-2 py-0 flex items-center text-xl hover:bg-primary hover:text-black hover:transition-all hover:duration-300'>Cart</li></Link>
                </ul>
            </div>
        </nav>
    </>
    )
}


export default Header