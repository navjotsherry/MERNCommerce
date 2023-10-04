import product from "../config/db/productSchema.js"
import ErrorHandler from '../utils/ErrorHandler.js'
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js"
import { Features } from "../utils/Feaures.js"



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
