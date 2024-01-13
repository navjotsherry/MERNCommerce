// Importing necessary modules and components
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

// Functional component for displaying a product
const Product = ({ product }) => {
    // Checking if the product data is available
    if (!product) return "Loading...";

    // Rendering the component
    return (
        // Link to the product details page
        <Link to={`/productDetails/${product._id}`}>
            {/* Product card */}
            <div className="p-2 my-6 mx-auto sm:w-72 overflow-hidden md:mx-4 md:my-4 justify-center items-center bg-gray-200 shadow-sm hover:shadow-lg rounded-md cursor-pointer duration-300 hover:scale-105">
                {/* Product image */}
                <div>
                    <img className="w-full" src={product.images[0].url} alt="" />
                </div>
                {/* Product details */}
                <div className="flex justify-between items-center p-2">
                    {/* Product name */}
                    <div className="text-l">{product?.name.substr(0, 12)}{product?.name.length > 12 ? "..." : ""}</div>
                    {/* Product price */}
                    <div className="text-l text-primary">{'$' + product?.price}</div>
                </div>
                {/* Rating and reviews */}
                <div className="flex justify-between ml-2 items-center">
                    {/* Star rating */}
                    <ReactStars edit={false} color={"rgb(0,0,0)"} size={18} activeColor={"rgb(255,153,0)"} value={product?.rating} isHalf={true} />
                    {/* Number of reviews */}
                    <div className="text-sm mr-2">{product?.numOfReviews} reviews</div>
                </div>
            </div>
        </Link>
    );
}

// Exporting the Product component
export default Product;