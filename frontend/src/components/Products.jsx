import React, { useEffect, useState } from 'react'
import MetaData from '../utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product.jsx'
import FilterOptions from './FilterOptions.jsx'
import { useParams } from 'react-router-dom'
import { fetchProductsfunc } from '../store/productSlice'
import Paginator from 'react-js-pagination'

const Products = () => {
  const [currentPage,setCurrentPage]= useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [productValueRange,setProductValueRange] = useState([0,5000])
  const setCurrentPageNo =(e)=>{
    setCurrentPage(e)
  }
  const dispatch = useDispatch()
  const {keyword} = useParams()
  const {products,isLoading,err} = useSelector(state=> state.products)

  useEffect(()=>{
    dispatch(fetchProductsfunc({keyword,currentPage,productsPerPage,productValueRange}))
  },[dispatch,keyword,currentPage,productValueRange])


  if(isLoading || !products) return "Loading"

  return (
  <>
    <MetaData title={"Products"}/>
    <div className="md:flex md:p-4">
      <div className="relative w-full top-5 left-6 lg:w-4/12 "><FilterOptions productValueRange={productValueRange} setProductValueRange={setProductValueRange}/></div>
      <div className="flex flex-col md:flex-row md:flex-wrap">{products.allProducts.map(product=> <Product product={product} key={product._id}/>)}</div>
    </div>
    <div className={productsPerPage>=products.productCount?"hidden":"flex justify-center items-center"}>
      <Paginator
        activePage={currentPage}
        itemsCountPerPage={productsPerPage}
        totalItemsCount = {products.productCount}
        onChange = {setCurrentPageNo}
        nextPageText="▶"
        prevPageText= "◀"
        firstPageText="◀◀"
        lastPageText="▶▶"
        itemClass="border p-3 text-sm rounded-md mx-2 text-primary border-black bg-black"
        linkClass="page-link text-white"
        activeClass="text-red bg-primary"
        activeLinkClass="text-black"
        innerClass='flex my-4'
        />
      </div>
    </>
  )
}

export default Products