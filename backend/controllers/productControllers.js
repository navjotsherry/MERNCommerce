import product from "../config/db/productSchema.js"


// Create New product 
export const createNewProduct = async (req, res)=>{
    const {name, description , price,images,category} = req.body
    // console.log(req.body)
    try {
        const productRes = await product.create({name,description,price,images,category})
        res.status(200).json({
            success: true,
            productRes
        })
    } catch (err) {
        console.log(err.message)
    }
}

//Get All the products
export const getAllProducts = async (req,res)=>{
    try {
        const allProducts = await product.find()
        res.status(200).json({
            success:true,
            allProducts
        })
    } catch (error) {
     console.log(error.message)   
    }
}

//Get Single Product's details
export const getProductDetails = async (req,res) => {
    try {
        const productDetail = await product.findById(req.params.id)
        res.status(200).json({
            success:true,
            productDetail
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

// Update the product 
export const updateProduct= async (req,res)=>{
    try {
        let savedProduct = await product.findById(req.params.id)
        savedProduct.name= req.body.name
        savedProduct.description = req.body.description
        savedProduct.price = req.body.price
        savedProduct.images = req.body.images
        savedProduct.category = req.body.category
        savedProduct.save()
        res.status(200).json({
            success:true,
            savedProduct
        })
    } catch (error) {
        res.status(400).json({success:false, error})
    }
}

//Delete Product
export const deleteProduct = async (req,res) =>{
    try {
        const delProduct = await product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            delProduct
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}