import product from "../config/db/productSchema.js"
import ErrorHandler from '../utils/ErrorHandler.js'
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js"
import { Features } from "../utils/Feaures.js"
import userSchema from "../config/db/userSchema.js"
import productSchema from "../config/db/productSchema.js"
import isTaxID from "validator/lib/isTaxID.js"



//Get All the products
export const getAllProducts = asyncAwaitErrorHandler(async (req,res)=>{
        const productCount = await product.countDocuments()
        const features = new Features(product.find(),req.query)
        .search()
        .filtered()
        .pagination();
        const allProducts = await features.query
        res.status(200).json({
            success:true,
            allProducts,
            productCount
        })
    
})

//Get Single Product's details
export const getProductDetails = asyncAwaitErrorHandler(async (req,res,next) => {
    const productDetail = await product.findById(req.params.id)
    if(!productDetail){
        return next(new ErrorHandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        productDetail
    })
   
})

//Create a Product Review
export const createProductReview = asyncAwaitErrorHandler(async (req,res,next) => {
    const {productId} = req.params
    const review = req.body.review
    const currentProduct = await product.findById(productId)
    const user = await userSchema.findById(req.user._id)

    if(!currentProduct){
        return next(new ErrorHandler("Product does not exists",400))
    }

    review.name = user.name
    review.user = req.user.id
    review.rating = Number(review.rating)

    let reviewIndex = 0

    const oldReview = currentProduct.reviews.find((element,index) => {
        if(element.user === req.user.id){
            reviewIndex = index
            return element
        }
    });

    if(oldReview){
        currentProduct.reviews[reviewIndex] = review
        console.log(currentProduct.reviews)
    }else{
        currentProduct.reviews.push(review)
    }

    let ratingsTotal = 0

    currentProduct.reviews.forEach(element => {
        ratingsTotal += Number(element.rating)
    });

    currentProduct.numOfReviews = currentProduct.reviews.length
    const avg = ratingsTotal / currentProduct.numOfReviews

    currentProduct.rating = avg.toFixed(2)


    await currentProduct.save({runValidators:true})

    res.json({
        success:true,
        currentProduct
    })
})


//Delete Product Review
export const deleteProductReview = asyncAwaitErrorHandler(async(req,res,next)=>{
    const productId = req.params.productId
    const user = req.user

    const currentProduct = await product.findById(productId)

    if(!currentProduct){
        return next(new ErrorHandler("No product found",400))
    }

    let reviewIndex = 0

    const isReviewed = currentProduct.reviews.find((element,index)=>{
        if(element.user.toString() === user.id.toString()){
            reviewIndex = index
            return true
        }
    })

    if(isReviewed){
        currentProduct.reviews.splice(reviewIndex,1)
    }else{
        return next(new ErrorHandler("Rating does not exist",400))
    }

    currentProduct.numOfReviews = currentProduct.reviews.length

    let totalRatings = 0
    
    currentProduct.reviews.forEach(element =>{
        totalRatings += Number(element.rating)
    })

    let avgRating = totalRatings/currentProduct.numOfReviews

    currentProduct.rating = avgRating.toFixed(2)

    await currentProduct.save()

    res.json({
        success:true,
        currentProduct
    })

})

//Get All Product Reviews
export const getAllProductReviews = asyncAwaitErrorHandler(async (req,res,next)=>{
    const productId = req.params.productId
    const currentProduct = await product.findById(productId)

    if(!currentProduct){
        return next(new ErrorHandler("No Product found",404))
    }

    res.status(200).json({
        success:true,
        reviews: currentProduct.reviews
    })


})
//Admin Controllers Below this//

// Create New product 
export const createNewProduct = asyncAwaitErrorHandler(async (req, res,next)=>{
    req.body.user = req.user.id

    const productRes = await product.create(req.body)
    res.status(200).json({
        success: true,
        productRes
    })

})


// Update the product 
export const updateProduct= asyncAwaitErrorHandler(async (req,res,next)=>{
    let savedProduct = await product.findById(req.params.id)
    if(!savedProduct){
        return next(new ErrorHandler("Product Not Found",404))
    }
    savedProduct = await product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,useFindAndModify:false})
     
    res.status(200).json({
        success:true,
        savedProduct
       })
})

//Delete Product
export const deleteProduct = asyncAwaitErrorHandler(async (req,res,next) =>{
        const delProduct = await product.findById(req.params.id)
        if(!delProduct){
            return next(new ErrorHandler("Product Not Found",404))
        }
        await delProduct.remove()
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
})
