import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext';

function Slider() {
    const [value,setValue] =useState(0);
    const { products,setFilteredData } = useContext(AppContext)
    const filterByPrice = (price) => {
        console.log(price)
        setFilteredData(products.filter((data) => data.price >= price))
        
      }
    const handleSliderChange =(event)=>{
        setValue(event.target.value);
        filterByPrice(event.target.value*1000)
    }
  return (
    <div>
      <input
       type='range'
       min='0'
       max='100'
       value={value}
       onChange={handleSliderChange}
       step="1"
       />
       <p>Slider Value:{value}</p>
    </div>
  )
}

export default Slider
