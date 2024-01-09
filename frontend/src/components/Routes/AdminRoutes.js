import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Sidebar from '../admin/Sidebar.jsx'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
  const {isAuthenticated,user} = useSelector(state => state.user)

  if(!user) return "Loading..."

  if(isAuthenticated===false) return <Navigate to='/login'/>
  if(user?.user?.role!=="admin"){
    toast.error("Please login as administrator",{id:"Admin Error"})
    return (
    <Navigate to='/account'/>)
     }
  return (
  <>
    <div className="md:flex min-h-screen w-full">
        <div className="md:flex-[0.28] md:h-72 md:sticky md:top-20 z-10">
            <Sidebar />
        </div>
        <div className='md:flex-[0.72] lg:flex-1'>
          <Outlet/>
        </div>
    </div> 
  </>
  )
}

export default AdminRoutes