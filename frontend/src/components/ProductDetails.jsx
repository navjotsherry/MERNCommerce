import {useParams} from 'react-router-dom'
import { fetchProductDetail, clearState } from '../store/productDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {Carousel,IconButton, Rating} from '@material-tailwind/react'
import ReactStar from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import {toast} from 'react-hot-toast'
import MetaData from '../utils/MetaData'

const ProductDetails = ()=>{
    const dispatch=useDispatch()
    const {_id} = useParams()
    const product = useSelector(state=>state.product)
    const {productDetail,err} = useSelector(state=>state.product)
    useEffect(()=>{
        dispatch(fetchProductDetail(_id))
        return ()=>{
            dispatch(clearState())}
    },[dispatch])

    useEffect(()=>{
        if(err){
            toast.error(err.message,{
                id:"FetchProductDetailError"
            })
        }
    },[err])

    const changeCartValue =(e)=>{
        if(e.target.value > 999){
            e.target.value = 999
        }
        if(e.target.value<=0){
            e.target.value = 1
        }
    }

    if(!productDetail) return "Loading"
    
    return (
        <>
        <MetaData title={`${productDetail.name} -- Amazon`}/>
        <div className='flex flex-col w-full items-center justify-center md:flex-row md:p-24 lg:p-6'>
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
        {productDetail?.images.map(image =>{
            return <img
            key={image.publicId}
            src={image.url}
            alt="image 1"
            className="h-full w-full object-cover"
          />
        })}
    </Carousel>
    <div className='p-6 w-full md:w-auto lg:w-4/12'>
         <div className='text-2xl lg:text-3xl xl:my-8'>{productDetail?.name}</div>
        <div className="my-4 xl:my-10"> {productDetail ? <ReactStar value={productDetail?.rating} color={"rgb(0,0,0)"} size={30} activeColor={"rgb(255,153,0)"} edit={false} isHalf={true}/>:"Loading..."}</div>
        <div className='my-4 xl:my-8 text-3xl lg:text-4xl'>${productDetail?.price}</div>
        <div className={productDetail?.Stock < 1 ? "hidden" : "flex flex-col lg:flex-row xl:mt-8"}>
            <div className="flex w-32">
                <button className="grid place-items-center bg-primary hover:bg-black hover:text-primary hover:duration-300 px-3 rounded-l-md text-3xl py-2">-</button>
                    <input className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-y-2 border-primary w-4/12 text-center' onChange={(e)=>changeCartValue(e)} min="1" max="999" type="number" defaultValue={1} />
                <button className="grid place-items-center hover:bg-black hover:text-primary hover:duration-300 bg-primary px-3 rounded-r-md text-2xl py-2">+</button>
            </div>
            <button className='bg-primary hover:bg-black hover:text-primary hover:duration-300 my-2 w-28 rounded-md p-2 lg:my-0 lg:mx-4'>Add to Cart</button>
        </div>
        {productDetail.Stock < 5 && productDetail.Stock >=0 ? 
        <div className={"text-sm my-1 text-red-700"}>{productDetail.Stock === 0 ? "No" : `Only ${productDetail.Stock}`} items left in stock</div>
       : <div className={"text-xs my-1 text-gray-600"}>{productDetail.Stock} items are in stock</div>
    }
    <div className="text-2xl mt-4 mb-1">Description:</div>
    <div className="text-sm text-gray-700">{productDetail.description}</div>
    <button className='px-4 py-2 bg-primary hover:bg-black hover:text-primary hover:duration-300 text-lg rounded-md my-3 xl:my-6'>Add a review</button>

    </div>
    </div>
    <div className=" bg-gray-200 ">
        <div className="underline text-4xl p-2">Reviews</div> 
        
            {productDetail.reviews.length > 1 ? 
            <div className="flex flex-col px-10 items-center  overflow-y-scroll h-96 md:px-4 md:overflow-y-auto md:flex-row overflow-x-scroll py-2">
            {productDetail.reviews.map((review)=> <ReviewCard key={review._id} reviews={review}/>)} 
            </div>
            : <><div  className="text-2xl text-center py-2 w-full">No reviews & ratings</div>
            <div className="text-sm text-center pb-4">Be the first one to rate</div>
             </>}
                            
        
    
    </div>
            
    </>
    )
}

export default ProductDetails