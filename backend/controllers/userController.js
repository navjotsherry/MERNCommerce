import ErrorHandler from "../utils/ErrorHandler.js";
import asyncAwaitErrorHandler from '../utils/asyncAwaitErrorHandler.js'
import userSchema from "../config/db/userSchema.js";


 export const registerUser = asyncAwaitErrorHandler(async (req,res,next)=>{
    const {name,email,password} = req.body
    const user = await userSchema.create({
        name, email,password,
        avatar:{
            publicId: "Sample Public ID",
            url:"Sample URL"
        }
    })
    res.status(201).json({
        success:true,
        user
    })
})
