import app from "./app.js";
import dotenv from 'dotenv'
import DBConnection from "./config/database.js";
import cloudinary from 'cloudinary'

// Handling Uncaught Exception
process.on("uncaughtException",()=>{
    console.log("Closing the Server due to Uncaught Exception")
    process.exit(1)
})

dotenv.config({path:"./config/config.env"})

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

DBConnection(DB_URI)

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY
})

const server = app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})

//Unhandled Promise Rejection Error Handler 
process.on('unhandledRejection', err =>{
    console.log(err.message)
    console.log("Shutting down the server due to Unhandled Promise rejection")
    server.close(()=>{
        process.exit(1)
    })
})