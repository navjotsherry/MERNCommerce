import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


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

//Returns a Web token generated using user ID and Secret Key
user.methods.jwtToken =  function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_TOKEN_EXPIRE})
}

//Compare the given password with saved hashed password in database and return a boolean
user.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

//Generate and store a random hashed value to reset password
user.methods.generateResetToken = function(){
    const token = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(token).toString("hex")

    this.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    return token

} 

export default mongoose.model("User",user)