import express from 'express'
import { loginUser, registerUser,logoutUser, forgotPassword,resetPassword } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)
userRouter.post('/forgot',forgotPassword)
userRouter.post('/reset/:token',resetPassword)

export default userRouter