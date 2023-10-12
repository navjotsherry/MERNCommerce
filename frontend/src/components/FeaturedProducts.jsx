import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "./Product.jsx"
import { fetchProductsfunc } from '../store/productSlice.js'
import ProductsShimmer from "../Layouts/ProductsShimmer.jsx"

const FeaturedProducts = () => {
    const dispatch = useDispatch()
  const {isLoading,products,isError} = useSelector(state=> state.products)
  useEffect(()=>{
    dispatch(fetchProductsfunc())
  },[dispatch])

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
        {products?.allProducts.map((product)=>{
        return <Product key={product._id} product={product} />
      })}
    </div>
  )
}

export default FeaturedProducts