import React from 'react'
import { Country , State} from 'country-state-city'

const Shipping = () => {
    const [userInfo,setUserInfo] = React.useState({address:"" , city:"", phone:""})
    const [country,setCountry ] = React.useState()
    const [state,setState ] = React.useState()
    const handleUserInfo = (e) => {
        setUserInfo({...userInfo, [e.target.name]:e.target.value })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(userInfo)
    }
  return (
    <div className='flex items-center justify-center min-h-[86vh]'>
        <div className="flex flex-col items-center rounded-md border-4 min-h-[80%] border-primary">
            
            
            <form type="submit" onSubmit={handleSubmit}  className='flex flex-col items-center justify-center'>
                
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="text" name='address' onChange={handleUserInfo} value={userInfo.address}  className='mx-2 bg-transparent outline-none' placeholder='Address' /></div>
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="text" name='city' onChange={handleUserInfo} value={userInfo.city} className='mx-2 bg-transparent outline-none' placeholder='City' /></div>
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="tel" name='phone' onChange={handleUserInfo} value={userInfo.phone} className='mx-2 bg-transparent outline-none' placeholder='Phone' /></div>
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><select onChange={(e)=>setCountry(e.target.value)} type="text"  className=' w-52 bg-transparent outline-none'>
                    {Country.getAllCountries().map(element=> <option value={element.isoCode} key={element.isoCode}>{element.name}</option>)}</select>
                </div>
                {country && <div className="flex px-4 py-2 items-center w-60 justify-center border mx-8 border-black rounded-md mt-8"><select onChange={(e)=>setState(e.target.value)} value={country} type="text"  className='mx-2 bg-transparent w-56 outline-none'>
                    {State.getStatesOfCountry(country).map(element=> <option value={element.isoCode} key={element.isoCode}>{element.name}</option>)}</select>
                </div>}
                <button type="submit" className='my-8 px-4 py-2 bg-primary text-2xl rounded-md w-[80%] hover:bg-black hover:text-primary duration-300'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Shipping