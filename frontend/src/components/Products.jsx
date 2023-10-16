import React, { useEffect } from 'react'
import MetaData from '../utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product.jsx'
import FilterOptions from './FilterOptions.jsx'
import { useParams } from 'react-router-dom'
import { fetchProductsfunc } from '../store/productSlice'

const Products = () => {
  const dispatch = useDispatch()
  const {keyword} = useParams()
  const {products,isLoading,err} = useSelector(state=> state.products)

  useEffect(()=>{
    dispatch(fetchProductsfunc(keyword))
  },[dispatch,keyword])


  if(isLoading || !products) return "Loading"

  return (
  <>
    <MetaData title={"Products"}/>
    <div className="md:flex md:p-4">
      <div className="sm:hidden md:flex w-4/12"><FilterOptions/></div>
      <div className="flex flex-col md:flex-row md:flex-wrap">{products.allProducts.map(product=> <Product product={product} key={product._id}/>)}</div>
    </div>
    </>
  )
}

export default Products