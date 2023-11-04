import React from 'react'
import './form.css'
import Navbar from './Navbar'

function Login() {
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
                                <option value="frontend_developer">Front-End Developer</option>
                                <option value="php_developer">PHP Developer</option>
                                <option value="python_developer">Python Developer</option>
                                <option value="rails_developer">Rails Developer</option>
                                <option value="web_designer">Web Designer</option>
                                <option value="wordpress_developer">Wordpress Developer</option>
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

export default Login