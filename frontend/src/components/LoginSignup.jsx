import React,{useState} from 'react'
import {MdEmail,MdLockOpen} from 'react-icons/md'

const LoginSignup = () => {
    const [signup,setSignup] = useState(false)
  return (
    <div className='flex items-center justify-center min-h-[86vh]'>
        <div className="flex flex-col items-center rounded-md border-4 border-primary">
            <div className="flex border-b-4 border-primary">
                <div onClick={()=> setSignup(false)} className={`${signup? "":"bg-primary"} w-1/2 px-12 border-r-2 border-primary text-xl hover:bg-black hover:text-primary duration-300 py-4 cursor-pointer border-b-primary`}>Login</div>
                <div onClick={()=>setSignup(true)} className={`${signup? "bg-primary":""} w-1/2 px-12 border-l-2 border-primary text-xl hover:bg-black hover:text-primary duration-300 py-4 cursor-pointer border-b-primary`}>Signup</div>
            </div>
            <form type="submit" className='flex flex-col items-center justify-center'>
        <div className="flex px-4 py-2 items-center justify-center border border-black rounded-md mt-8"><MdEmail/><input type="email" className='mx-2 outline-none' placeholder='Email' /></div>
        <div className="flex px-4 py-2 items-center justify-center border border-black rounded-md my-8"><MdLockOpen/><input type="password" className='mx-2 outline-none' placeholder='Password' /></div>
        <div className={` ${signup? "" : "hidden"} flex px-4 py-2 items-center justify-center border border-black rounded-md mb-8`}><MdLockOpen/><input type="password" className='mx-2 outline-none' placeholder='Confirm Password' /></div>
            <button type="submit" className='mb-8 px-4 py-2 bg-primary text-2xl rounded-md w-[80%] hover:bg-black hover:text-primary duration-300'>{signup?"Register Now":"Login"}</button>
            </form>
        </div>
        
    </div>
  )
}

export default LoginSignup