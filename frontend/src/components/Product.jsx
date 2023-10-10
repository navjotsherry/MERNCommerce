import ReactStars from 'react-rating-stars-component'

const Product = ()=>{
    return (
        <div className="p-2 mx-2 my-4 w-48 justify-center items-center border border-black shadow-sm hover:shadow-lg rounded-lg cursor-pointer hover:scale-110">
            <div>
            <img className="w-auto" src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F61%2F70%2F61708115ff10932bd9bb771f3110089435ac345e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_tshirtstanks_shortsleeve%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" alt="" />

            </div>
            <div className="flex justify-between items-center p-2">
                <div className="text-xl">{"Shirt"}</div>
                <div className="text-xl">$35</div>
            </div>
            <div className="flex justify-between items-center">
                <ReactStars edit={false} color={"rgb(0,0,0)"} size={18} activeColor={"rgb(255,153,0)"} value={2.6} isHalf={true}/>
                <div className="text-sm">256 reviews</div>  
            </div>


        </div>
    )
}


export default Product