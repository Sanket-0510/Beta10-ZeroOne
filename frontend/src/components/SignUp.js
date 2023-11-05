import React,{useState} from 'react'
import './form.css'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
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

    function SignUp() {
        const navigate = useNavigate();
        const [formData, setFormData] = useState({
          name: '',
          age: '',
          address: '',
          state: '',
          phoneNo: '',
        });
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value,
          });
        };
      
        const handleOnclick = async() => {

          // Send the form data to the desired route using the fetch API.

         await fetch('http://10.12.88.32:8000/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              // Handle any errors here
              console.error(error);
            });
           navigate('/Login')
        };
      
        return (
          <>
            <Navbar title="FarmEasy" />
            <div className="row">
              <div className="col-md-12">
                <form>
                  <h1> Sign Up </h1>
      
                  <fieldset>
                    <legend>
                      <span className="number">1</span> Your Basic Info
                    </legend>
      
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
      
                    <label>Age:</label>
                    <input
                      type="number"
                      id="inAge"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </fieldset>
      
                  <fieldset>
                    <legend>
                      <span className="number">2</span> Your Contact Info
                    </legend>
      
                    <label htmlFor="addr">Address:</label>
                    <textarea
                      id="addr"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
      
                    <label htmlFor="job">State:</label>
                    <select
                      id="job"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      {state.map((e, ind) => {
                        return (
                          <option value={e.toLowerCase()} key={ind}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                    <label>Phone:</label>
                    <input
                      type="number"
                      id="sphone"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                    />
                  </fieldset>
      
                  <button
                    type="button"
                    className="sfbtn"
                    onClick={handleOnclick}
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </>
        );
      }
      
      export default SignUp;