import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const user = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:[3,"Name should be greater than 3 letters"],
        maxlength:[30,"Name Too long."]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid email"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
            publicId:{
            type:String,
            required:true
            },
            url:{
                type:String,
                required:true
            }
        },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken : String,
    resetTokenExpiry:Date
})

user.pre("save", async function bcrypting(next){
    if(!this.isModified("password")){
        next()
    }
    if(validator.isStrongPassword(this.password)){
        this.password = await bcrypt.hash(this.password,10)
    }else{
        throw Error("Please Enter a Strong Password")
    }
    
})

user.methods.jwtToken =  function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_TOKEN_EXPIRE})
}

export default mongoose.model("User",user)