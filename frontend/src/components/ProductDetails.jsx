import {useParams} from 'react-router-dom'
import { fetchProductDetail, clearState } from '../store/productDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {Carousel,IconButton} from '@material-tailwind/react'
import ReactStar from 'react-rating-stars-component'

const ProductDetails = ()=>{
    const dispatch=useDispatch()
    const {_id} = useParams()
    const product = useSelector(state=>state.product)

    useEffect(()=>{
        dispatch(fetchProductDetail(_id))
        return ()=>{
            dispatch(clearState())}
    },[dispatch])

    if(!product.productDetail) return "Loading"
    
    {return (
        <div className='flex flex-col w-full items-center justify-center md:flex-row md:p-24'>
        <Carousel
      className="rounded-xl h-auto mx-16 md:w-96"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
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
          color="white"
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
        {product?.productDetail?.images.map(image =>{
            return <img
            key={image.publicId}
            src={image.url}
            alt="image 1"
            className="h-full w-full object-cover"
          />
        })}
    </Carousel>
    <div className='p-6 w-full md:w-auto'>
         <div className='text-2xl'>{product?.productDetail?.name}</div>
        <div className="my-4"> {product?.productDetail ? <ReactStar value={product?.productDetail?.rating} color={"rgb(0,0,0)"} size={18} activeColor={"rgb(255,153,0)"} edit={false} isHalf={true}/>:"Loading..."}</div>
        <div className='my-4 text-3xl'>${product?.productDetail?.price}</div>
        <div className="flex">
            <div className="grid place-items-center bg-primary px-3 rounded-l-md text-3xl py-2">-</div>
            <input className='border border-y-2 border-primary w-10 text-center' type="text" defaultValue={1} />
            <div className="grid place-items-center bg-primary px-3 rounded-r-md text-2xl py-2">+</div>
        </div>

    </div>
    </div>
    )
}}

export default ProductDetails