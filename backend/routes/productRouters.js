import express from "express";
import { getAllProducts,createNewProduct, updateProduct, deleteProduct, getProductDetails } from "../controllers/productControllers.js";
import { isAuthenticated,isAuthorized} from "../middleware/isAuthenticated.js";

const router = express.Router()


router.get('/products',isAuthenticated,isAuthorized("admin"),getAllProducts)
router.post('/new/product',isAuthenticated,createNewProduct)
router.put('/product/:id',isAuthenticated,updateProduct)
router.get('/product/:id',getProductDetails)
router.delete('/product/del/:id',isAuthenticated,deleteProduct)


export default router