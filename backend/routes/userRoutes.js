import express from 'express'
import { loginUser, registerUser,logoutUser, forgotPassword,resetPassword, changePassword, myDetails, updateUserProfile, getAllUsers, getSingleUser, deleteUser, updateUserRole } from '../controllers/userController.js'
import { isAuthenticated, isAuthorized } from '../middleware/isAuthenticated.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',logoutUser)
userRouter.post('/forgot',forgotPassword)
userRouter.post('/reset/:token',resetPassword)
userRouter.put('/changePassword',isAuthenticated,changePassword)
userRouter.get('/myProfile',isAuthenticated,myDetails)
userRouter.put('/updateProfile',isAuthenticated,updateUserProfile)

//Admin Routes below this//

userRouter.get('/getAllUsers',isAuthenticated,isAuthorized("admin"),getAllUsers)
userRouter.get('/getUser/:id',isAuthenticated,isAuthorized("admin"),getSingleUser)
userRouter.delete('/deleteUser/:id',isAuthenticated,isAuthorized("admin"),deleteUser)
userRouter.put('/updateUserRole/:id',isAuthenticated,isAuthorized("admin"),updateUserRole)


export default userRouter