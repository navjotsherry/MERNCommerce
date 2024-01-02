// Importing necessary modules and components
import React, { useEffect, useState,useCallback } from 'react';
import MetaData from '../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product.jsx';
import FilterOptions from './FilterOptions.jsx';
import { useParams } from 'react-router-dom';
import { fetchProductsfunc } from '../store/productSlice';
import Paginator from 'react-js-pagination';
import toast from 'react-hot-toast';

// Functional component for displaying products
const Products = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  // State for filter options
  const [productValueRange, setProductValueRange] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const [openFilters, setOpenFilters] = useState(false);

  // Function to set the current page number
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  // Redux dispatch and selector
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { products, isLoading, err } = useSelector(state => state.products);

  // Debounce function utility
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedFetchProducts = useCallback(
    debounce((productValueRange) => {
      dispatch(fetchProductsfunc({ keyword, currentPage, productsPerPage, productValueRange, category }));
    }, 300)
    
    ,

    [dispatch, keyword, currentPage, category, productsPerPage]
  );

  // Fetching products on component mount or when products dependencies change
  useEffect(() => {
    debouncedFetchProducts(productValueRange)
  }, [debouncedFetchProducts,productValueRange]);

  // Fetching products on component mount or when dependencies change
  useEffect(() => {
    dispatch(fetchProductsfunc({ keyword, currentPage, productsPerPage, productValueRange, category }));
  }, [dispatch, keyword, currentPage, category, productsPerPage]);

  // Handling errors
  if (err) {
    return (
      <>
        {toast.error(err.message, { id: "ErrorProducts" })}
      </>
    );
  }

  // Loading state
  if (isLoading || !products) {
    return "Loading";
  }

  // Rendering the component
  return (
    <>
      {/* Metadata component for page title */}
      <MetaData title={"Products"} />

      {/* Filter options and product display */}
      <div className="md:flex md:p-4">
        {/* Filter Options button (visible on small screens) */}
        <div className={`${openFilters ? "hidden" : ""} md:hidden text-sm text-right m-2 font-bold text-black cursor-pointer underline hover:text-primary`} onClick={() => setOpenFilters(true)}>Filter Options</div>
        
        {/* Filter Options panel (visible on medium and larger screens) */}
        <div className={`${openFilters ? "" : "hidden"} top-36 mx-auto h-96 md:h-auto md:block md:max-h-[70vh] left-6 z-10 p-4 w-11/12 fixed border-4 rounded-md backdrop-blur-sm md:border-3 border-primary md:sticky md:top-28 md:mr-8 lg:top-32 md:w-5/12 lg:w-3/12`}>
          <FilterOptions productValueRange={productValueRange} setCategory={setCategory} setOpenFilters={setOpenFilters} setProductValueRange={setProductValueRange} />
        </div>

        {/* Product display section */}
        <div className="flex mx-auto flex-col w-9/12 md:flex-row md:flex-wrap">
          {products?.allProducts.map(product => <Product product={product} key={product._id} />)}
        </div>
      </div>

      {/* Pagination section */}
      <div className={productsPerPage > products.filteredProductsCount ? "hidden" : "flex justify-center items-center"}>
        <Paginator
          activePage={currentPage}
          itemsCountPerPage={productsPerPage}
          totalItemsCount={products.filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText="▶"
          prevPageText="◀"
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
  );
}

// Exporting the Products component
export default Products;