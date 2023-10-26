import React from 'react'
import { MdPerson3,MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { logoutUserSlice } from '../store/userSlice'

const UserOptions = ({isSearching,isUserOptionsOpen,UserOptionsOpenClick}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        dispatch(logoutUserSlice())
        UserOptionsOpenClick()
        navigate("/login")
    }

  return (
    <div>
        <li onClick={UserOptionsOpenClick} className={`${isSearching ? "hidden" : " "} cursor-pointer text-primary p-2 ml-3 mr-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}>
            <div className="mx-auto text-2xl p-2 flex items-center">
                <MdPerson3/>
            </div>
        </li>
        {isUserOptionsOpen && <ul className='absolute top-20 right-16 text-center rounded-sm text-xl text-primary p-2 bg-black'>
            <Link to="/account"><li className='px-4 py-2 border-b-2 border-primary cursor-pointer hover:bg-primary hover:text-black duration-300' onClick={UserOptionsOpenClick}>My Account</li></Link>
            <li className='px-4 py-2 border-b-2 border-primary cursor-pointer hover:bg-primary hover:text-black duration-300' onClick={UserOptionsOpenClick}>My Orders</li>
            <li onClick={handleLogout} className='px-4 py-2 hover:bg-primary cursor-pointer flex items-center justify-center hover:text-black duration-300' ><MdLogout className='mr-2'/> Logout</li>
        </ul>}

    </div>
  )
}

export default UserOptions