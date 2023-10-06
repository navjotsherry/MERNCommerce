import express from 'express'
import { createOrder, deleteOrder } from '../controllers/orderControllers.js'
import { isAuthenticated, isAuthorized } from '../middleware/isAuthenticated.js'


const orderRouter = express.Router()


orderRouter.post('/createOrder',isAuthenticated,createOrder)
orderRouter.delete('/deleteOrder/:orderId',isAuthenticated,isAuthorized("admin"),deleteOrder)





export default orderRouter