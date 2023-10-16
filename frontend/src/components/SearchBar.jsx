import React, { useState } from 'react'
import {GrSearch,GrClose} from 'react-icons/gr'
import {useNavigate} from 'react-router-dom'

const SearchBar = ({setSearching}) => {
    const [keyword,setKeyword] = useState('')
    const navigate = useNavigate()
    const searchHandler =(e)=>{
        e.preventDefault()
        let trimmedKeyword = keyword.trim()
        if(trimmedKeyword){
            navigate(`/products/${trimmedKeyword}`)
        }else{
            navigate('/products')
        }
    }
    const closeSearchHandler = ()=>{
        setKeyword('')
        setSearching(false)
    }

  return (
    <div className="flex items-center justify-center">
    <form  onSubmit={searchHandler} className=''>
        <input className='focus:border-none outline-none bg-transparent w-10/12 placeholder:text-gray-800' value={keyword} placeholder='Search' onChange={(e)=>setKeyword(e.target.value)}/>
        <button className="ml-2 cursor-pointer" type='submit'><GrSearch/></button>
    </form>
    <button onClick={closeSearchHandler} className="cursor-pointer"><GrClose/></button>
    </div>
)
}

export default SearchBar