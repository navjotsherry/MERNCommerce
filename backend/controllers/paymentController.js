import {asyncAwaitErrorHandler} from '../utils/asyncAwaitErrorHandler'
import stripe from 'stripe'

const striper = new stripe(process.env.STRIPE_SECRET_KEY)
export const processPayment = asyncAwaitErrorHandler(async (req,res,next)=>{
    
})