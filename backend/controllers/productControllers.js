import product from "../config/db/productSchema.js"


// Create New product 
export const createNewProduct = async (req, res)=>{
    
        const productRes = await product.create(req.body)
        res.status(200).json({
            success: true,
            productRes
        })
    
}

//Get All the products
export const getAllProducts = async (req,res)=>{
   
        const allProducts = await product.find()
        res.status(200).json({
            success:true,
            allProducts
        })
    
}

//Get Single Product's details
export const getProductDetails = async (req,res) => {
    const productDetail = await product.findById(req.params.id)
    if(!productDetail){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        productDetail
    })
   
}

// Update the product 
export const updateProduct= async (req,res)=>{
    let savedProduct = await product.findById(req.params.id)
    if(!savedProduct){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    savedProduct = await product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true,useFindAndModify:false})
     
    res.status(200).json({
        success:true,
        savedProduct
       })
}

//Delete Product
export const deleteProduct = async (req,res) =>{
        const delProduct = await product.findById(req.params.id)
        if(!delProduct){
            return res.status(400).json({
                success:false,
                message:"No such product found"
            })
        }
        await delProduct.remove()
        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
}