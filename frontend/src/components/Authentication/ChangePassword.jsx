import React from 'react'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../store/userSlice'


const ChangePassword = () => {
    const dispatch = useDispatch()
    const [authData,setAuthData] = React.useState({oldPassword:'', password:'' ,confirmPassword:''}) 

    const handleFormDataChange = (e)=>{
        setAuthData((prevState)=>{
           return {...prevState, [e.target.name]:e.target.value}
        })
        
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        dispatch(changePassword(authData))
        setAuthData({oldPassword:'', password:'' ,confirmPassword:''})
    }

    return (
    <div className='grid place-items-center h-[84vh] '>
        <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-around border-4 p-5 text-left border-primary rounded-md">
            <label className='text-md text-left w-full'>Old Password: </label>
            <input onChange={handleFormDataChange} name='oldPassword' value={authData.oldPassword} className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <label className='text-md text-left w-full'>New Password: </label>
            <input onChange={handleFormDataChange} name='password' value={authData.password} className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <label className='text-md text-left w-full'>Confirm new password: </label>
            <input onChange={handleFormDataChange} name='confirmPassword' value={authData.confirmPassword} className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <button className='bg-primary text-lg my-4 p-4 rounded-md hover:bg-black hover:text-primary duration-300' type='submit'>Change Password</button>
        </form>
    </div>
  )
}

export default ChangePassword