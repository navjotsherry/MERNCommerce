import express from 'express'
import router from './routes/productRouters.js'
import {ErrorHandlerMid} from './middleware/ErrorHandlerMid.js'
import userRouter from './routes/userRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1',router)
app.use('/api/v1',userRouter)
app.use('/api/v1',orderRouter)
app.use(ErrorHandlerMid)

export default app