import app from "./app.js";
import dotenv from 'dotenv'

dotenv.config({path:"./config/config.env"})

const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})