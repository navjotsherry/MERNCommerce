import app from "./app.js";
import dotenv from 'dotenv'
import DBConnection from "./config/database.js";

dotenv.config({path:"./config/config.env"})

const PORT = process.env.PORT
DBConnection()


app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})