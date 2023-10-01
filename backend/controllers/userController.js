import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from '../utils/asyncAwaitErrorHandler.js'
import userSchema from "../config/db/userSchema.js";
import { sendJWToken } from "../utils/sendJWToken.js";
import sendEmail from "../utils/sendEmail.js";
import userRouter from "../routes/userRoutes.js";
import crypto from 'crypto'


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


//Forgot Password
export const forgotPassword = asyncAwaitErrorHandler(async (req,res,next)=>{

    const user = await userSchema.findOne({email:req.body.email})
    const token = user.generateResetToken()
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/forgotPassword/${token}`

    const message = `Your Password reset link is following:- \n\n ${resetPasswordUrl} \n\n Please ignore if you have not made any such request`

    try {
        await sendEmail({
            email:user.email,
            subject : `Ecommerce Password Recovery`,
            message,
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetTokenExpiry = Date.now()
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }

});

export const resetPassword = async (req,res,next) =>{
    const {password,confirmPassword} = req.body
    const token = req.params.token

    const resetPasswordToken = crypto.createHash("sha256").update(token).toString("hex")

    
    if(password != confirmPassword){
        next(new ErrorHandler("Password do not match",400))
    }

    const user = userSchema.findOne({
        resetPasswordToken,
        resetTokenExpiry: {$gt:Date.now()}
    })

    if(!user){
        next(new ErrorHandler("Invalid or Expired URL",401))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetTokenExpiry = undefined
    await user.save()
    sendJWToken(user,200,res)
}