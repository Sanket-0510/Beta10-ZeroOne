import React, { useState } from 'react';

const state = ["Apple", "Carrot", "Rice", "Tomato"];

function LifePredict() {
  const [dropDown, setDropDown] = useState('');
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    temp: '',
    Hum: '',
    Stper: '',
  });

  const handleDropChange = (e) => {
    setDropDown(e.target.value);
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleClick = () => {
    // Perform the API request with formData and dropDown value
    // Replace the API URL and data handling logic with your specific implementation
    fetch(`https://your-api-url.com`, {
      method: 'POST',
      body: JSON.stringify({ ...formData, commodity: dropDown }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className="LifePred">
      <div className="tosend">
        <div className="indata">
          <label htmlFor="temp">Temperature:</label>
          <input type="number" name="temp" value={formData.temp} onChange={handleInputChange} />
        </div>
        <div className="indata">
          <label htmlFor="Hum">Humidity:</label>
          <input type="number" name="Hum" value={formData.Hum} onChange={handleInputChange} />
        </div>
        <div className="indata">
          <label htmlFor="Stper">Stored Period:</label>
          <input type="number" name="Stper" value={formData.Stper} onChange={handleInputChange} />
        </div>
        <div className="indata">
          <label htmlFor="commodity">Commodity:</label>
          <select id="commodity" name="commodity" onChange={handleDropChange} value={dropDown}>
            <option value="">Select an option</option>
            {state.map((e, ind) => (
              <option value={e.toLowerCase()} key={ind}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-outline-warning btn-lg me-5" onClick={handleClick}>
        {">"}
      </button>
      <h2 className="resres">Result: {result}</h2>
    </div>
  );
}

export default LifePredict;
