import React from 'react'
import { Country , State} from 'country-state-city'

const Shipping = () => {
    const [country,setCountry ] = React.useState()
  return (
    <div className='flex items-center justify-center min-h-[86vh]'>
        <div className="flex flex-col items-center rounded-md border-4 min-h-[80%] border-primary">
            
            
            <form type="submit"  className='flex flex-col items-center justify-center'>
                
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="text"  className='mx-2 bg-transparent outline-none' placeholder='Address' /></div>
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="text"  className='mx-2 bg-transparent outline-none' placeholder='City' /></div>
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><select onChange={(e)=>setCountry(e.target.value)} type="text"  className='mx-2 bg-transparent outline-none'>
                    {Country.getAllCountries().map(element=> <option value={element.isoCode} key={element.isoCode}>{element.name}</option>)}</select>
                </div>
                {country && <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><select onChange={(e)=>setCountry(e.target.value)} type="text"  className='mx-2 bg-transparent outline-none'>
                    {State.getStatesOfCountry(country).map(element=> <option value={element.isoCode} key={element.isoCode}>{element.name}</option>)}</select>
                </div>}
                <div className="flex px-4 py-2 items-center justify-center border mx-8 border-black rounded-md mt-8"><input type="text"  className='mx-2 bg-transparent outline-none' placeholder='City' /></div>
                <button type="submit" className='mb-8 px-4 py-2 bg-primary text-2xl rounded-md w-[80%] hover:bg-black hover:text-primary duration-300'>"Login"</button>
            </form>
        </div>
    </div>
  )
}

export default Shipping