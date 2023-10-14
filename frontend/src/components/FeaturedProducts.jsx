import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "./Product.jsx"
import { fetchProductsfunc } from '../store/productSlice.js'
import ProductsShimmer from "../Layouts/ProductsShimmer.jsx"
import toast,{Toaster} from "react-hot-toast"

const FeaturedProducts = () => {
    const dispatch = useDispatch()

  const {isLoading,products,err} = useSelector(state=> state.products)

  useEffect(()=>{
    dispatch(fetchProductsfunc())
  },[dispatch])



  if(err) return (
      <>
      {
        toast.error(err.message,{id:"Error"})}
      </>      
      )

  if(isLoading) return (
    <div className="flex flex-wrap">
      
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  <ProductsShimmer/>
  </div>
  )

  return (
    <div className='m-8 flex flex-col items-center sm:flex-row sm:flex-wrap'>
        { products?.success ? products?.allProducts.map((product)=>{
        return <Product key={product._id} product={product} />
      }) : products?.message && toast.custom((t) => (
        <div
          className={`bg-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
          {products?.message}
        </div>
      ),{id:"Unable to Fetch Featured Products"}) }
    </div>
  )
}

export default FeaturedProducts