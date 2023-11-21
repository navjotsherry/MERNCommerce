import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { processPayment, sendStripeApiKey } from '../controllers/paymentController.js'

const route = express.Router()


route.get('/processPayment',isAuthenticated, processPayment)
route.get('/getStripeApiKey',isAuthenticated, sendStripeApiKey)

export default route