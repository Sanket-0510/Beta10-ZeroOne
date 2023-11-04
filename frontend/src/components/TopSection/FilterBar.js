import { useNavigate } from "react-router-dom"
import React from 'react'
import './fltr.css'

const state = ["Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"]
const commodityNames = [
  "CHANA",
  "COTTON",
  "GROUND NUT",
  "SESAMUM(SESAME/GINGELLY/TIL)",
  "SOYABEANS",
  "WHEAT",
  "BOTTLE GOURD",
  "BRINJAL",
  "LADIES FINGER (BHINDI)",
  "PADDY(DHAN)",
  "GUAR SEEDS",
  "MOONG WHOLE (GREEN GRAM)",
  "MUSTARD SEED (SARSON)",
  "MAIZE",
  "ONION",
  "POINTED GOURD (PARVAL)",
  "ARHAR DAL SPLIT(RED GRAM SPLIT)",
  "TOMATO",
  "JOWAR (SORGHUM)",
  "POTATO",
  "BAJRA"
];

function FilterBar() {
  const Navigate = useNavigate();
  const handleGoClick = () => {
    Navigate('/MainSearchPage')
  }
  return (
    <>
      <div className='fltrbar'>
        <div className="stateclr">
          <label htmlFor="job">State:</label>
          <select id="job" name="user_job">
            {
              state.map((e, ind) => {
                return <option value={e.toLowerCase()} key={ind}>{e}</option>
              })
            }
          </select>
        </div>
        <div className="stateclr">
          <label htmlFor="job">Commodity:</label>
          <select id="job" name="user_job">
            {
              commodityNames.map((e, ind) => {
                return <option value={e.toLowerCase()} key={ind}>{e}</option>
              })
            }
          </select>
        </div>

      </div>
      <button className=" filled" onClick={handleGoClick}>Go</button>
    </>


  )
}

export default FilterBar