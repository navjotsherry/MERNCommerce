import { Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const Product = ({product})=>{
    
    if(!product) return "Loading..."

    return (
        <Link to={`/productDetails/${product._id}`}>
        <div className="p-2 my-6 mx-auto sm:w-72 overflow-hidden md:mx-4 md:my-4 justify-center items-center bg-gray-200 shadow-sm hover:shadow-lg rounded-md cursor-pointer duration-300 hover:scale-105">
            
            <div>
            <img className="w-full" src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F61%2F70%2F61708115ff10932bd9bb771f3110089435ac345e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" alt="" />

            </div>
            <div className="flex justify-between items-center p-2">
                <div className="text-l">{product?.name.substr(0,12)}{product?.name.length > 12 ? "..." : ""}</div>
                <div className="text-l text-primary">{'$'+product?.price}</div>
            </div>
            <div className="flex justify-between ml-2 items-center">
                <ReactStars edit={false} color={"rgb(0,0,0)"} size={18} activeColor={"rgb(255,153,0)"} value={product?.rating} isHalf={true}/>
                <div className="text-sm mr-2">{product?.numOfReviews} reviews</div>  
            </div>

        </div>
        </Link>
    )
}


export default Product