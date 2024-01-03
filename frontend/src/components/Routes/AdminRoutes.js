import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
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
  return <Outlet/>
}

export default AdminRoutes