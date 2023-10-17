import React from 'react'
import ReactSlider from 'react-slider'

const FilterOptions = ({setProductValueRange,productValueRange}) => {
  return (
    <div>
      <ReactSlider
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
  />
    </div>
  )
}

export default FilterOptions