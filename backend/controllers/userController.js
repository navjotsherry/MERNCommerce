import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from '../utils/asyncAwaitErrorHandler.js'
import userSchema from "../config/db/userSchema.js";
import { sendJWToken } from "../utils/sendJWToken.js";


 export const registerUser = asyncAwaitErrorHandler(async (req,res,next)=>{
    const {name,email,password} = req.body
    const user = await userSchema.create({
        name, email,password,
        avatar:{
            publicId: "Sample Public ID",
            url:"Sample URL"
        }
    })

    sendJWToken(user,201,res)
})


export const loginUser = asyncAwaitErrorHandler(async (req,res,next)=>{
    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHandler("Please enter both email and password",401))
    }

    const user = await userSchema.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Please enter valid email or password",400))
    }
    
    const passwordMatched = await user.comparePassword(password)

    if(!passwordMatched){
        return next(new ErrorHandler("Please enter valid email or password",400))
    }

    sendJWToken(user,200,res)

})

//Logout user
export const logoutUser = asyncAwaitErrorHandler(async (req,res,next)=>{

    
    res.cookie("token", null,
        {expires: new Date(Date.now()),
        httpOnly:true})
    res.status(200).json({
            success:true
        })
})