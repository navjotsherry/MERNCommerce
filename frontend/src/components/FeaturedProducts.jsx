import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "./Product.jsx"
import { fetchProductsfunc } from '../store/productSlice.js'
import ProductsShimmer from "../Layouts/ProductsShimmer.jsx"
import toast from "react-hot-toast"

const FeaturedProducts = () => {
    const dispatch = useDispatch()

    // Use the useSelector hook to access data from the Redux store.
    const { isLoading, products, err } = useSelector(state => state.products)

    useEffect(() => {
        // Dispatch an action to fetch products when the component mounts.
       dispatch(fetchProductsfunc({ keyword: "", currentPage: 1 }))
    }, [dispatch])

    // Handle error case and display a toast message.
    if (err) return (
        <>
            {toast.error(err.message, { id: "Error" })}
        </>
    )

    // Display a loading indicator with shimmer effect while data is being fetched.
    if (isLoading) return (
        <div className="flex flex-wrap">
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
            <ProductsShimmer />
        </div>
    )

    return (
        <div className='m-8 flex flex-col items-center md:flex-row md:flex-wrap'>
            {products?.success ? products?.allProducts.map((product) => {
                return <Product key={product._id} product={product} />
            }) : products?.message && toast.custom((t) => (
                <div
                    className={`bg-white px-6 py-4 shadow-md rounded-full ${
                        t.visible ? 'animate-enter' : 'animate-leave'
                    }`}
                >
                    {products?.message}
                </div>
            ), { id: "Unable to Fetch Featured Products" })}
        </div>
    )
}

export default FeaturedProducts