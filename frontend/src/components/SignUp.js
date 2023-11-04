import React from 'react'
import './form.css'
import Navbar from './Navbar'

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

    return (
        <>
            <Navbar title="FarmEasy" />
            <div className="row">
                <div className="col-md-12">
                    <form action="index.html" method="post">
                        <h1> Sign Up </h1>

                        <fieldset>

                            <legend><span className="number">1</span> Your Basic Info</legend>

                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="user_name" />

                            <label>Age:</label>
                            <input type='number' id="inAge" name="user_age" />

                        </fieldset>
                        <fieldset>

                            <legend><span className="number">2</span> Your Contact Info</legend>

                            <label htmlFor="addr">Address:</label>
                            <textarea id="addr" name="user_addr"></textarea>

                            <label htmlFor="job">State:</label>
                            <select id="job" name="user_job">
                                {
                                    state.map((e,ind) => {
                                        return <option value={e.toLowerCase()} key={ind}>{e}</option>
                                    })
                                }
                            </select>
                            <label>Phone:</label>
                            <input type='number' id="sphone" name="user_phone" />

                        </fieldset>

                        <button type="submit" className='.sfbtn'>Sign Up</button>

                    </form>
                </div>
            </div>
        </>

    )
}

export default SignUp