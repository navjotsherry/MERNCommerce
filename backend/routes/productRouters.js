import express from "express";
import { getAllProducts,createNewProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteProductReview, getAllProductReviews } from "../controllers/productControllers.js";
import { isAuthenticated,isAuthorized} from "../middleware/isAuthenticated.js";

const router = express.Router()


router.get('/products',getAllProducts)
router.get('/product/:id',getProductDetails)
router.put('/productReview/:productId',isAuthenticated,createProductReview)
router.delete('/productReview/:productId',isAuthenticated,deleteProductReview)
router.get('/productReview/:productId',isAuthenticated,getAllProductReviews)



//Admin Routes Below this
router.post('/new/product',isAuthenticated,isAuthorized("admin"),createNewProduct)
router.put('/product/:id',isAuthenticated,isAuthorized("admin"),updateProduct)
router.delete('/product/del/:id',isAuthenticated,isAuthorized("admin"),deleteProduct)


export default router