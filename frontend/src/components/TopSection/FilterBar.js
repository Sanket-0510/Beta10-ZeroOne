import { useNavigate } from "react-router-dom"
import React from 'react'

function FilterBar() {
  const Navigate = useNavigate();
  const handleGoClick = () =>{
    Navigate('/MainSearchPage')
  }
  return (
    <>
      <div className='fltrbar'>
      </div>
      <button className=" filled" onClick={handleGoClick}>Go</button>
    </>


  )
}

export default FilterBar