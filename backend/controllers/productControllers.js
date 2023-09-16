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

// Update the product 
export const updateProduct= async (req,res)=>{
    try {
        let savedProduct = await product.findById(req.params.id)
        if(!savedProduct){
            res.status(500).json({
                success:false,
                error:"No saved product found"
            })
        }
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
        console.log(error.message)
    }
}