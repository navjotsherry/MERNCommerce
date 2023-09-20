import product from "../config/db/productSchema.js"
import ErrorHandler from '../utils/ErrorHandler.js'
import { asyncAwaitErrorHandler } from "../utils/asyncAwaitErrorHandler.js"

// Create New product 
export const createNewProduct = asyncAwaitErrorHandler(async (req, res)=>{
    
    const productRes = await product.create(req.body)
    res.status(200).json({
        success: true,
        productRes
    })

})

//Get All the products
export const getAllProducts = async (req,res)=>{
   
        const allProducts = await product.find()
        res.status(200).json({
            success:true,
            allProducts
        })
    
}

//Get Single Product's details
export const getProductDetails = async (req,res,next) => {
    const productDetail = await product.findById(req.params.id)
    if(!productDetail){
        return next(new ErrorHandler("Product Not Found",404))
    }
    res.status(200).json({
        success:true,
        productDetail
    })
   
}

// Update the product 
export const updateProduct= async (req,res,next)=>{
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
}

//Delete Product
export const deleteProduct = async (req,res,next) =>{
        const delProduct = await product.findById(req.params.id)
        if(!delProduct){
            return next(new ErrorHandler("Product Not Found",404))
        }
        await delProduct.remove()
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
}