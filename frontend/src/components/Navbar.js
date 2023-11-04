import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar(props) {
    const Navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem("Token");
        // Navigate("/Login");
    }
    return (
        <nav className="navbar navbar-expand-lg h-auto " >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><h2>{props.title}</h2></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/About">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {!localStorage.getItem("Token") && <button className="btn btn-outline-success me-1 btn-lg" type="button" onClick={()=>Navigate("/Login")}>Login</button>}
                        {!localStorage.getItem("Token") && <button className="btn btn-outline-success ms-1 btn-lg" type="button" onClick={()=>Navigate("/SignUp")}>Signup</button>}
                        {localStorage.getItem("Token") && <button className="btn btn-outline-success ms-1 btn-lg" type="button" onClick={onLogout}>Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar