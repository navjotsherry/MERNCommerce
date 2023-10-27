import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {FaPenNib} from 'react-icons/fa'
import { updateUserSlice } from '../store/userSlice'

const Profile = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const [updateData ,setUpdateData]= useState({name:null,email:null,avatar:null})
    const handleSaveProfile = ()=>{
        const formData = new FormData()
        if(updateData.name){
            formData.set('name',updateData.name)
        }
        if(updateData.email){
            formData.set('email',updateData.email)
        }
        if(updateData.avatar){
            formData.set('avatar',updateData.avatar)
        }
        dispatch(updateUserSlice(formData))
    }
    const handlePhotoChange = (e)=>{
        if(!e.target.files[0]){
            return 
        }

        const fileReader = new FileReader()
        fileReader.onload=()=>{
            if(fileReader.readyState === 2){
                console.log(fileReader.result)
                setUpdateData({...updateData, avatar:fileReader.result})
            }
        }

        fileReader.readAsDataURL(e.target.files[0])
        
    }
  return (
    <>
        <div className="text-4xl my-2 text-center md:text-left md:mx-16 md:my-6">My Profile</div>
        <div className='flex flex-col md:my-6 md:flex-row lg:justify-center md:px-12 max-w-5xl mx-auto'>
            <div className="grid place-items-center h-64 md:w-1/2 md:h-96">
                <input hidden onChange={handlePhotoChange} type='file' accept='image/*' id='profilePic'/>
                <label htmlFor="profilePic">
                    <img className='rounded-full p-4 bg-none hover:border-4 md:max-h-96 md:p-4 cursor-pointer hover:border-primary' src={updateData.avatar? updateData.avatar : user.user.avatar.url} alt={user.user.name} />
                </label>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:w-1/2">
                <div className="flex flex-col md:flex-row my-2 md:my-2">
                    <div className="text-2xl md:mr-4">Name: </div>
                    <div className="flex">
                        <input className="text-2xl text-gray-700" value={updateData.name ? updateData.name : user.user.name} onChange={(e)=>setUpdateData({...updateData, name:e.target.value})} disabled={!updateData.name} />
                        <div onClick={()=>setUpdateData({...updateData , name:user.user.name})} className="grid place-items-center p-2 text-primary bg-black rounded-md ml-3 text-sm cursor-pointer hover:bg-primary hover:text-black duration-300"><FaPenNib/></div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row my-2 md:my-2">
                    <div className="text-2xl md:mr-4">Email: </div>
                    <div className="flex">
                        <input className="text-2xl text-gray-700" value={updateData.email ? updateData.email : user.user.email} onChange={(e)=>setUpdateData({...updateData , email : e.target.value})} disabled={!updateData.email} />
                        <div onClick={()=>setUpdateData({...updateData , email:user.user.email})} className="grid place-items-center p-2 text-primary bg-black rounded-md ml-3 text-sm cursor-pointer hover:bg-primary hover:text-black duration-300"><FaPenNib/></div>
                    </div>
                </div>         
            </div>
        </div>
        <div className="flex justify-center items-center">
            <button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'> My Orders</button>
            <button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Change Password</button>
        </div>
        {(updateData.name || updateData.email || updateData.avatar) && 
        <div className="grid my-4 place-items-center"><button onClick={handleSaveProfile} className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Save My Profile</button></div>}
    </>
  )
}

export default Profile