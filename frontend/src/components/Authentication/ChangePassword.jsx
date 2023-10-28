import React from 'react'

const ChangePassword = () => {
  return (
    <div className='grid place-items-center h-[84vh] '>
        <form className="flex flex-col items-center justify-around border-4 p-5 text-left border-primary rounded-md">
            <label className='text-md text-left w-full'>Old Password: </label>
            <input className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <label className='text-md text-left w-full'>New Password: </label>
            <input className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <label className='text-md text-left w-full'>Confirm new password: </label>
            <input className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary' type="password" />
            <button className='bg-primary text-lg my-4 p-4 rounded-md hover:bg-black hover:text-primary duration-300' type='submit'>Change Password</button>
        </form>
    </div>
  )
}

export default ChangePassword