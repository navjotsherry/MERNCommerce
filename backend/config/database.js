import mongoose from "mongoose";


const DBConnection = (DB_URI) =>{
    mongoose.connect(DB_URI,{ useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log(`Database connected with server: ${data.connection.host}`)
    })
}

export default DBConnection