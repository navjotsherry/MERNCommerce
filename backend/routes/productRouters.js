import express from "express";
import { getAllProducts,createNewProduct, updateProduct, deleteProduct, getProductDetails } from "../controllers/productControllers.js";


const router = express.Router()


router.get('/products',getAllProducts)
router.post('/new/product',createNewProduct)
router.put('/product/:id',updateProduct)
router.get('/product/:id',getProductDetails)
router.delete('/product/del/:id',deleteProduct)


export default router