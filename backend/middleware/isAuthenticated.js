import userSchema from "../config/db/userSchema.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from "../utils/asyncAwaitErrorHandler.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncAwaitErrorHandler(async (req,res,next)=>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",400))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY)
    

    req.user = await userSchema.findById(decodedData._id)
    
    if(!req.user){
        next(new ErrorHandler("User does not exist",401))
    }

    next()
})


export const isAuthorized = (...roles) =>  (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this route`, 401))
        }
        next()
    }