import React,{useEffect, useState} from 'react'
import {MdEmail,MdLockOpen,MdPerson} from 'react-icons/md'
import { loginUserSlice, registerUser } from '../store/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toaster from 'react-hot-toast'

const LoginSignup = () => {
    const [signup,setSignup] = useState(false)
    const [authData,setAuthData] = useState({name:"",email:"",password:"",confirmPassword:""})
    const [avatar,setAvatar] = useState()
    const [avatarPreview,setAvatarPreview] = useState("https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(state=> state.user.user)

    useEffect(()=>{
        if(user?.user){
            localStorage.setItem("user",JSON.stringify(user.user))
            return navigate('/account')
        }
    },[user])

    const handlePhotoSubmit = (e)=>{
        if(!e.target.files[0]){
            return
        }
        const reader = new FileReader()
        reader.onload = () =>{
            if(reader.readyState == 2){
                setAvatar(reader.result)
                setAvatarPreview(reader.result)
            }
        }
        
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(signup){
            if(authData.password !== authData.confirmPassword){
                 return toaster.error("Passwords do not match",{id:"PasswordMismatch"}) 
            }
            // const formData = new FormData()

            // formData.set("name",authData.name)
            // formData.set("email",authData.email)
            // formData.set("password",authData.password)
            // formData.set("avatar",avatar)
            dispatch(registerUser({name:authData.name,email:authData.email,password:authData.password}))
        }else{
            dispatch(loginUserSlice({"email" : authData.email , "password":authData.password}))

        }
    }

    

  return (
    <div className='flex items-center justify-center min-h-[86vh]'>
        <div className="flex flex-col items-center rounded-md border-4 min-h-[80%] border-primary">
            <div className="flex border-b-4 border-primary">
                <div onClick={()=> setSignup(false)} className={`${signup? "":"bg-primary"} w-1/2 px-12 border-r-2 border-primary text-xl hover:bg-black hover:text-primary duration-300 py-4 cursor-pointer border-b-primary`}>Login</div>
                <div onClick={()=>setSignup(true)} className={`${signup? "bg-primary":""} w-1/2 px-12 border-l-2 border-primary text-xl hover:bg-black hover:text-primary duration-300 py-4 cursor-pointer border-b-primary`}>Signup</div>
            </div>
            
            <form type="submit" onSubmit={handleSubmit} encType={`${signup ? "multipart/form-data" : ""}`} className='flex flex-col items-center justify-center'>
                <div className={` ${signup? "" : "hidden"} flex items-center justify-around mt-8`}>
                    <label htmlFor="avatar-input" >
                        <img className='w-14 items hover:mix-blend-screen bg-black cursor-pointer rounded-full' src={avatarPreview} alt="ProfilePhoto" />
                    </label>
                    <input type="file" accept="image/*" id='avatar-input' className='hidden' onChange={handlePhotoSubmit} />
                </div>
                <div className={` ${signup? "" : "hidden"} flex px-4 py-2 items-center justify-center border border-black rounded-md mt-8`}><MdPerson/><input type="text" onChange={(e)=> setAuthData({...authData , name:e.target.value})} className='mx-2 bg-transparent outline-none' placeholder='Name' /></div>
                <div className="flex px-4 py-2 items-center justify-center border border-black rounded-md mt-8"><MdEmail/><input type="email" onChange={(e)=> setAuthData({...authData , email:e.target.value})} className='mx-2 bg-transparent outline-none' placeholder='Email' /></div>
                <div className="flex px-4 py-2 items-center justify-center border border-black rounded-md my-8"><MdLockOpen/><input type="password" className='mx-2 outline-none' onChange={(e)=>setAuthData({...authData, password: e.target.value})} placeholder='Password' /></div>
                <div className={` ${signup? "" : "hidden"} flex px-4 py-2 items-center justify-center border border-black rounded-md mb-8`}><MdLockOpen/><input type="password" className='mx-2 outline-none' onChange={(e)=>setAuthData({...authData, confirmPassword:e.target.value})} placeholder='Confirm Password' /></div>
                
                <button type="submit" className='mb-8 px-4 py-2 bg-primary text-2xl rounded-md w-[80%] hover:bg-black hover:text-primary duration-300'>{signup?"Register Now":"Login"}</button>
            </form>
        </div>
        
    </div>
  )
}

export default LoginSignup