import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {user} = useSelector(state => state.user)

  return (
    <>
        <div className="text-4xl my-2 text-center md:text-left md:mx-16 md:my-6">My Profile</div>
        <div className='flex flex-col md:my-6 md:flex-row lg:justify-center md:px-12 max-w-5xl mx-auto'>
            <div className="grid place-items-center h-64 md:w-1/2 md:h-96">
                <img className='rounded-full p-4 hover:border-4 md:max-h-96 md:p-4 cursor-pointer hover:border-primary' src={user.user.avatar.url} alt={user.user.name} />
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:w-1/2">
                <div className="flex my-4 md:my-2">
                    <div className="text-2xl mx-2">Full Name: </div>
                    <div className="text-2xl text-gray-700">{user.user.name}</div>
                </div>
                <div className="flex my-4 md:my-4">
                    <div className="text-2xl mx-2">Email: </div>
                    <div className="text-2xl text-gray-700">{user.user.email}</div>
                </div>            
            </div>
        </div>
        <div className="flex justify-center items-center">
            <button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'> My Orders</button>
            <button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Change Password</button>
        </div>
        <div className="grid my-4 place-items-center"><button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Edit My Profile</button></div>
    </>
  )
}

export default Profile