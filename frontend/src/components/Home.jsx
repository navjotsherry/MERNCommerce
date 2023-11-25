// Importing necessary modules and components
import { GiMouse } from 'react-icons/gi';
import MetaData from '../utils/MetaData';
import FeaturedProducts from './FeaturedProducts';

// Functional component for the Home page
const Home = () => {
    // Rendering the component
    return (
        <>
            {/* Metadata component for page title */}
            <MetaData title="Home" />
            
            {/* Main content section */}
            <div className='h-[88vh] flex flex-col justify-center items-center clip-your-needful-style bg-gradient-to-r from-primary to-yellow-300'>
                {/* Welcome message */}
                <h1 className='text-3xl'>Welcome to E-Commerce</h1>
                <h1 className='text-2xl mt-4'>Get Amazing products Below</h1>
                {/* Scroll indicator */}
                <h1 className='text-xl border border-1 rounded-md flex items-center mt-6 p-2 border-black hover:bg-black hover:text-primary hover:cursor-pointer transition-all duration-300'>
                    <GiMouse /> Scroll
                </h1>
            </div>

            {/* Featured Products section */}
            <div className='text-4xl text-center underline m-14'>Featured Products</div>
            {/* Featured Products component */}
            <FeaturedProducts />
        </>
    );
}

// Exporting the Home component
export default Home;