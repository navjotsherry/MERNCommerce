import mongoose from "mongoose";

const DB_URI = "mongodb://localhost:27017/ECommerceDB" || process.env.DB_URI


const DBConnection = () =>{
    mongoose.connect(DB_URI,{ useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log(`Database connected with server: ${data.connection.host}`)
    }).catch((err)=>console.log(err))
}

export default DBConnection