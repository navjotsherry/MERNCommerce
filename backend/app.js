import express from 'express'
import router from './routes/productRouters.js'
import {ErrorHandlerMid} from './middleware/ErrorHandlerMid.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1',router)
app.use(ErrorHandlerMid)

export default app