import express from 'express'
import { allOrders, createOrder, deleteOrder, getAllMyOrders, getSingleOrder, updateOrderStatus } from '../controllers/orderControllers.js'
import { isAuthenticated, isAuthorized } from '../middleware/isAuthenticated.js'


const orderRouter = express.Router()


orderRouter.post('/createOrder',isAuthenticated,createOrder)
orderRouter.get('/getOrder/:orderId',isAuthenticated,getSingleOrder)
orderRouter.get('/getMyOrders',isAuthenticated,getAllMyOrders)
//Admin Routes Below this
orderRouter.post('/updateStatus/:orderId',isAuthenticated,isAuthorized("admin"),updateOrderStatus)
orderRouter.delete('/deleteOrder/:orderId',isAuthenticated,isAuthorized("admin"),deleteOrder)
orderRouter.get('/allOrders',isAuthenticated,isAuthorized("admin"),allOrders)




export default orderRouter