import React, { useEffect, useState } from 'react'
import MetaData from '../utils/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product.jsx'
import FilterOptions from './FilterOptions.jsx'
import { useParams } from 'react-router-dom'
import { fetchProductsfunc } from '../store/productSlice'
import Paginator from 'react-js-pagination'
import toast from 'react-hot-toast'

const Products = () => {
  const [currentPage,setCurrentPage]= useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [productValueRange,setProductValueRange] = useState([0,5000])
  const [category,setCategory] = useState("")
  const [openFilters, setOpenFilters] = useState(false)
  const setCurrentPageNo =(e)=>{
    setCurrentPage(e)
  }
  const dispatch = useDispatch()
  const {keyword} = useParams()
  const {products,isLoading,err} = useSelector(state=> state.products)

  useEffect(()=>{
    dispatch(fetchProductsfunc({keyword,currentPage,productsPerPage,productValueRange,category}))
  },[dispatch,keyword,currentPage,productValueRange,category,productsPerPage])

  if(err) return (
    <>
    {
      toast.error(err.message,{id:"ErrorProducts"})}
    </>      
    )

  if(isLoading || !products) return "Loading"

  return (
  <>
    <MetaData title={"Products"}/>
    <div className="md:flex md:p-4"> 
      <div className={`${openFilters ? "hidden" : ""} md:hidden text-sm text-right m-2 font-bold text-black cursor-pointer underline hover:text-primary`} onClick={()=>setOpenFilters(true)}>Filter Options</div>
      <div className={`${openFilters ? "" : "hidden"} top-36 mx-auto h-96 md:h-auto md:block md:max-h-[70vh] left-6 z-10 p-4 w-11/12 fixed border-4 rounded-md backdrop-blur-sm md:border-3 border-primary md:sticky md:top-28 md:mr-8 lg:top-32 md:w-5/12 lg:w-3/12`}><FilterOptions productValueRange={productValueRange} setCategory={setCategory} setOpenFilters={setOpenFilters} setProductValueRange={setProductValueRange}/></div>
      <div className="flex mx-auto flex-col w-9/12 md:flex-row md:flex-wrap">{products?.allProducts.map(product=> <Product product={product} key={product._id}/>)}</div>
    </div>
    <div className={productsPerPage>products.filteredProductsCount?"hidden":"flex justify-center items-center"}>
      <Paginator
        activePage={currentPage}
        itemsCountPerPage={productsPerPage}
        totalItemsCount = {products.filteredProductsCount}
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