import express from 'express'
import { loginUser, registerUser,logoutUser, forgotPassword,resetPassword, changePassword } from '../controllers/userController.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)
userRouter.post('/forgot',forgotPassword)
userRouter.post('/reset/:token',resetPassword)
userRouter.put('/changePassword',isAuthenticated,changePassword)

export default userRouter