import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,"Please enter a valid name"]
    },
    description:{
        type: String,
        required:[true,"Please enter a valid description"]
    },
    price:{
        type: Number,
        required:[true,"Please enter a valid price."],
        maxlength: [6,"Price should be lesser than 6 digits."]
    },
    images:[
        {
            publicId:{
            type:String,
            required:true
            },
            url:{
                type:String,
                required:true
            }
            }
    ],
    rating:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"Please enter product category."]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxlength:[4,"Stock cannot Exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name :{
                type:String,
                required:true
            }, 
            rating :{
                type:String,
                required:true
            },
            comment :{
                type:String
            },
            user : {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required:true
            }
        }
    ],
    user : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})


export default mongoose.model('Product',productSchema)