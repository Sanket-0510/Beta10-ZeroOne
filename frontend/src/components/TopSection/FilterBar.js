import { useNavigate } from "react-router-dom"
import React, { useContext } from 'react'
import './fltr.css'
import NewContext from "../../Context/NewContext"

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

function FilterBar(props) {
  const context = useContext(NewContext);
  const { selectedCrop, selectedState, setselectedState, setselectedCrop, filterData, setfilterData } = context;

  const Navigate = useNavigate();
  let type = props.type;
  const handleGoClick = async () => {

    console.log(selectedCrop)
    console.log(selectedState)

    const res = await fetch(`http://${process.env.REACT_APP_URL}:8000/crop/web/getCropData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        crop: selectedCrop,
        state: selectedState
      })
    })

    const data = await res.json();
    console.log(data);
    console.log("ckasd")
    setfilterData(data)
    Navigate('/MainSearchPage')
  }
  return (
    <>
      <div className='fltrbar'>
        <div className="stateclr">
          <label htmlFor="job">State:</label>
          <select id="job" name="user_job" onChange={(e => setselectedState(e.target.value))}>
            {
              state.map((e, ind) => {
                return <option value={e.toLowerCase()} key={ind}>{e}</option>
              })
            }
          </select>
        </div>
        <div className="stateclr">
          <label htmlFor="job">Commodity:</label>
          <select id="job" name="user_job" onChange={(e => setselectedCrop(e.target.value))}>
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

//comments 