import express from "express";
import { getAllProducts,createNewProduct, updateProduct, deleteProduct, getProductDetails } from "../controllers/productControllers.js";
import { isAuthenticated,isAuthorized} from "../middleware/isAuthenticated.js";

const router = express.Router()


router.get('/products',isAuthenticated,getAllProducts)
router.post('/new/product',isAuthenticated,isAuthorized("admin"),createNewProduct)
router.put('/product/:id',isAuthenticated,isAuthorized("admin"),updateProduct)
router.get('/product/:id',getProductDetails)
router.delete('/product/del/:id',isAuthenticated,isAuthorized("admin"),deleteProduct)


export default router