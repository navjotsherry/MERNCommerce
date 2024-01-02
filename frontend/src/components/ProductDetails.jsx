// Importing necessary modules and components
import { useParams } from 'react-router-dom';
import { fetchProductDetail, clearState, createAreview } from '../store/productDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import ReactStar from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import { toast } from 'react-hot-toast';
import MetaData from '../utils/MetaData';
import { addProduct } from '../store/cartSlice';
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Dialog from '@mui/material/Dialog'
import { DialogActions, TextField } from '@mui/material'
import Rating from '@mui/material/Rating'


// Functional component for displaying product details
const ProductDetails = () => {
    // Initializing Redux dispatch function
    const dispatch = useDispatch();
    // Getting the product ID from the route parameters
    const { _id } = useParams();
    // Local state for quantity
    const [quantity, setQuantity] = useState(1);
    //Toggle between open and close Review
    const [dialogOpen,setDialogOpen] = useState(false)
    // Fetching product details and error from Redux store
    const { productDetail, err } = useSelector(state => state.product);
    //Value for ratings and reviews
    const [newReview, setNewReview] = useState({review:"",rating:0}) 

    //Function to handle the Review and ratings submission
    const handleReviewSubmit = ()=>{
        setDialogOpen(false)
        const newReviewBody= {
            "review": {
                "rating":newReview.rating,
                "comment":newReview.review
            },
            "id":_id
        }
        dispatch(createAreview(newReviewBody))
    }


    // Effect to fetch product details when the component mounts
    useEffect(() => {
        dispatch(fetchProductDetail(_id));
        return () => {
            // Cleaning up the state when the component unmounts
            dispatch(clearState());
        };
    }, [dispatch, _id]);

    // Function to add the product to the cart
    const addToCart = () => {
        const { _id, name, price, images, category, Stock } = productDetail;
        const itemToCart = {
            _id,
            quantity,
            name,
            price,
            category,
            Stock,
            image: images[0].url,
        };
        dispatch(addProduct(itemToCart));
        toast.success("Item Added Successfully");
    };

    // Effect to handle errors and display notifications
    useEffect(() => {
        if (err) {
            toast.error(err.message, {
                id: "FetchProductDetailError",
            });
        }
    }, [err]);

    // Function to handle quantity input change
    const changeCartValue = (e) => {
        if (Number(e.target.value > productDetail.Stock)) {
            return setQuantity(Number(productDetail.Stock));
        }
        if (Number(e.target.value) > 999) {
            return setQuantity(Number(999));
        }
        if (e.target.value <= 1) {
            return setQuantity(1);
        }
        setQuantity(Number(e.target.value));
    };

    // Function to decrease quantity
    const decreaseValue = (e) => {
        if (quantity <= 1) {
            return setQuantity(1);
        }
        setQuantity(quantity - 1);
    };

    // Function to increase quantity
    const increaseValue = (e) => {
        if (Number(quantity + 1 > productDetail.Stock)) {
            return setQuantity(Number(productDetail.Stock));
        }
        setQuantity(quantity + 1);
    };

    // Rendering the component
    if (!productDetail) return "Loading";

    return (
        <>
            {/* Metadata component for page title */}
            <MetaData title={`${productDetail.name} -- Amazon`} />

            {/* Product details section */}
            <div className='flex flex-col w-full items-center justify-center md:flex-row md:p-24 lg:p-6'>
                {/* Image carousel */}
                <Carousel
                    className="rounded-xl h-auto mx-16 md:w-96 lg:w-3/12"
                    prevArrow={({ handlePrev }) => (
                        <IconButton
                            variant="text"
                            color="orange"
                            size="lg"
                            onClick={handlePrev}
                            className="!absolute top-2/4 left-4 -translate-y-2/4"
                        >
                            {/* Previous arrow SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                        </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                        <IconButton
                            variant="text"
                            color="orange"
                            size="lg"
                            onClick={handleNext}
                            className="!absolute top-2/4 !right-4 -translate-y-2/4"
                        >
                            {/* Next arrow SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </IconButton>
                    )}
                >
                    {/* Product images */}
                    {productDetail?.images.map((image) => (
                        <img
                            key={image.publicId}
                            src={image.url}
                            alt="image 1"
                            className="h-full w-full object-cover"
                        />
                    ))}
                </Carousel>

                {/* Product details information */}
                <div className='p-6 w-full md:w-auto lg:w-4/12'>
                    <div className='text-2xl lg:text-3xl xl:my-8'>{productDetail?.name}</div>
                    <div className="my-4 xl:my-10">
                        {productDetail ? (
                            // Star rating component
                            <ReactStar
                                value={productDetail?.rating}
                                color={"rgb(0,0,0)"}
                                size={30}
                                activeColor={"rgb(255,153,0)"}
                                edit={false}
                                isHalf={true}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                    <div className='my-4 xl:my-8 text-3xl lg:text-4xl'>${productDetail?.price}</div>
                    {/* Quantity control and add to cart button */}
                    <div className={productDetail?.Stock < 1 ? "hidden" : "flex flex-col lg:flex-row xl:mt-8"}>
                        <div className="flex w-32">
                            {/* Decrease quantity button */}
                            <button onClick={decreaseValue} className="grid place-items-center bg-primary hover:bg-black hover:text-primary hover:duration-300 px-3 rounded-l-md text-3xl py-2">-</button>
                            {/* Quantity input */}
                            <input
                                className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-y-2 border-primary w-4/12 text-center'
                                value={quantity}
                                onChange={(e) => changeCartValue(e)}
                                type="number"
                            />
                            {/* Increase quantity button */}
                            <button onClick={increaseValue} className="grid place-items-center hover:bg-black hover:text-primary hover:duration-300 bg-primary px-3 rounded-r-md text-2xl py-2">+</button>
                        </div>
                        {/* Add to cart button */}
                        <button onClick={addToCart} className='bg-primary hover:bg-black hover:text-primary hover:duration-300 my-2 w-28 rounded-md p-2 lg:my-0 lg:mx-4'>Add to Cart</button>
                    </div>
                    {/* Stock availability message */}
                    {productDetail.Stock < 5 && productDetail.Stock >= 0 ? (
                        <div className={"text-sm my-1 text-red-700"}>{productDetail.Stock === 0 ? "No" : `Only ${productDetail.Stock}`} items left in stock</div>
                    ) : (
                        <div className={"text-xs my-1 text-gray-600"}>{productDetail.Stock} items are in stock</div>
                    )}
                    {/* Product description */}
                    <div className="text-2xl mt-4 mb-1">Description:</div>
                    <div className="text-sm text-gray-700">{productDetail.description}</div>
                    {/* Add a review button */}
                    <button onClick={()=>setDialogOpen(true)} className='px-4 py-2 bg-primary hover:bg-black hover:text-primary hover:duration-300 text-lg rounded-md my-3 xl:my-6'>Add a review</button>
                </div>
            </div>

            {/* Reviews section */}
            <div className=" bg-gray-200 ">
                <div className="underline text-4xl p-2">Reviews</div>
                {/* Displaying reviews or a message if there are none */}
                {productDetail.reviews.length >= 1 ? (
                    <div className="flex flex-col px-10 items-center  overflow-y-scroll h-auto md:h-96 md:px-4 md:overflow-y-auto md:flex-row overflow-x-scroll py-2">
                        {productDetail.reviews.map((review) => (
                            <ReviewCard key={review._id} reviews={review} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="text-2xl text-center py-2 w-full">No reviews & ratings</div>
                        <div className="text-sm text-center pb-4">Be the first one to rate</div>
                    </>
                )}
            </div>
            <Dialog
            open={dialogOpen}
            >
                <DialogActions>
                    <div className="flex justify-end w-full">
                        <button className='bg-primary px-3 py-2 rounded-lg hover:bg-black hover:text-primary duration-300' onClick={()=>setDialogOpen(false)}>X</button>
                    </div>
                </DialogActions>
                <DialogContent className='p-0'>
                    <Rating name="half-rating" onChange={(e)=>{setNewReview({...newReview, rating:e.target.value})}} value={newReview.rating} precision={0.5} />
                      <DialogContentText>Enter a review below:</DialogContentText>

                      <TextField
                        autoFocus={true}
                        value={newReview.review}
                        onChange={(e)=> setNewReview({...newReview, review:e.target.value})}
                      />
                </DialogContent>
                <DialogActions>
                    <div className="flex justify-end w-full">
                        <button className='bg-primary px-3 py-2 rounded-lg hover:bg-black hover:text-primary duration-300' onClick={handleReviewSubmit}>Submit</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
};

// Exporting the ProductDetails component
export default ProductDetails;