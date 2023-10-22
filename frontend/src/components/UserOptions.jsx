import React from 'react'
import { MdPerson3 } from 'react-icons/md'
import { Link } from 'react-router-dom'

const UserOptions = ({isSearching}) => {
  return (
    <div><Link to='/login'>
        <li className={`${isSearching ? "hidden" : " "} cursor-pointer text-primary p-2 ml-3 mr-6 h-full bg-black rounded-md my-4 md:px-2 md:py-0 flex items-center text-xl md:h-14 lg:h-12 md:my-0 hover:bg-primary hover:text-black hover:transition-all hover:duration-300`}><div className="mx-auto text-2xl p-2 flex items-center"><MdPerson3/></div></li>
        </Link>
    </div>
  )
}

export default UserOptions