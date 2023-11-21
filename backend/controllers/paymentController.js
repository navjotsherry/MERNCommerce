import asyncAwaitErrorHandler from '../utils/asyncAwaitErrorHandler.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const processPayment = asyncAwaitErrorHandler(async (req,res,next)=>{
    const payment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"cad",
        metadata:{
            company:"Ecommerce"
        }
    })
    res.status(200).json({
        success:true,
        client_secret : payment.client_secret
    })
})

export const sendStripeApiKey = asyncAwaitErrorHandler( async (req,res,next)=>{
    res.status(200).json({
        success:true,
        stripeApiKey : process.env.STRIPE_API_KEY
    })
})