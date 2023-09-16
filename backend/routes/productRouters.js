import express from "express";
import { getAllProducts,createNewProduct, updateProduct } from "../controllers/productControllers.js";


const router = express.Router()


router.get('/products',getAllProducts)
router.post('/new/product',createNewProduct)
router.put('/product/:id',updateProduct)


export default router