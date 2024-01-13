import express from 'express'
import router from './routes/productRouters.js'
import {ErrorHandlerMid} from './middleware/ErrorHandlerMid.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import paymentRouter from './routes/paymentRouter.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
dotenv.config({path:"./config/config.env"})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true, origin:process.env.Frontend_URL}))
app.use(fileUpload())
app.use(cookieParser())
app.use(cors({credentials:true}))
app.use('/api/v1',router)
app.use('/api/v1',userRouter)
app.use('/api/v1',orderRouter)
app.use('/api/v1/',paymentRouter)
app.use(ErrorHandlerMid)

export default app