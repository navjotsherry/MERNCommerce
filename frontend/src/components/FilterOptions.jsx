import React from 'react'
import Slider from '@mui/material/Slider';
import {AiOutlineClose} from 'react-icons/ai'


const FilterOptions = ({setProductValueRange,productValueRange,setCategory,setOpenFilters}) => {
  const handleChange = (e,newPrice)=>{
    setProductValueRange(newPrice)
  }
  const setCategoryFunc= (element)=>{
    setCategory(element)
    setOpenFilters(false)
  }
  const categories = ["Laptop","Mobile","Memory Cards","Personal Computers","Tablets"]
  return (
    <div>
      <div className="flex justify-end"><AiOutlineClose onClick={()=>setOpenFilters(false)} className='text-black hover:text-primary duration-300 cursor-pointer text-2xl text-right'/></div>
      
      <div className="text-2xl">Price:</div>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={productValueRange}
        onChange={handleChange}
        min={20}
        max={20000}
        valueLabelDisplay="auto"
        aria-labelledby='range-slider'
        getAriaValueText={()=>"333"}
      />
      <div className="text-2xl mt-3">Categories:</div>
      {categories.map((element) => {
        return <div key={element} className="ml-4 cursor-pointer" onClick={()=>setCategoryFunc(element)}>{element}</div>
      })}





      {/* <ReactSlider
    className="horizontal-slider w-5/6 h-4 items-center bg-primary border-2 border-black rounded-lg"
    thumbClassName="example-thumb bg-black cursor-pointer mt-3 text-primary p-4 rounded-full hover:text-black hover:bg-primary border-2 border-black"
    trackClassName="example-track h-2"
    defaultValue={[productValueRange[0], productValueRange[1]]}
    min={20}
    max={5000}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    onAfterChange={(e)=>setProductValueRange(e)}
    renderThumb={(props, state) => <div {...props}>{state.valueNow} </div>}
    pearling
    minDistance={10}
  /> */}
    </div>
  )
}

export default FilterOptions