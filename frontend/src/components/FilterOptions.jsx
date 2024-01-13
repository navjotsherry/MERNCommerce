import React from 'react'
import Slider from '@mui/material/Slider';
import { AiOutlineClose } from 'react-icons/ai'

const FilterOptions = ({ setProductValueRange, productValueRange, setCategory, setOpenFilters }) => {
    // Function to handle price range change.
    const handleChange = (e, newPrice) => {
        setProductValueRange(newPrice)
    }

    // Function to set the selected category and close the filter options.
    const setCategoryFunc = (element) => {
        setCategory(element);
        setOpenFilters(false);
    }

    // List of available categories.
    const categories = ["Laptop", "Mobile", "Memory Cards", "Personal Computers", "Tablets"]

    return (
        <div>
            {/* Close button for mobile view. */}
            <div className="flex md:hidden justify-end">
                <AiOutlineClose onClick={() => setOpenFilters(false)} className='text-black hover:text-primary duration-300 cursor-pointer text-2xl text-right' />
            </div>

            {/* Price range slider. */}
            <div className="text-2xl md:mt-4">Price:</div>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={productValueRange}
                onChange={handleChange}
                min={1}
                max={3000}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                getAriaValueText={() => "333"}
            />

            {/* Categories selection. */}
            <div className="text-2xl mt-3">Categories:</div>
            {categories.map((element) => {
                return <div key={element} className="ml-4 cursor-pointer" onClick={() => setCategoryFunc(element)}>{element}</div>
            })}

            {/* Alternative slider component (ReactSlider) */}
            {/* <ReactSlider
                className="horizontal-slider w-5/6 h-4 items-center bg-primary border-2 border-black rounded-lg"
                thumbClassName="example-thumb bg-black cursor-pointer mt-3 text-primary p-4 rounded-full hover:text-black hover:bg-primary border-2 border-black"
                trackClassName="example-track h-2"
                defaultValue={[productValueRange[0], productValueRange[1]]
                min={20}
                max={5000}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                onAfterChange={(e) => setProductValueRange(e)}
                renderThumb={(props, state) => <div {...props}>{state.valueNow} </div>}
                pearling
                minDistance={10}
            /> */}
        </div>
    )
}

export default FilterOptions