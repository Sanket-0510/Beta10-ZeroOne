import React, { useState } from 'react'
import Navbar from '../Navbar'
import './mstyles.css'
import FilterBar from '../TopSection/FilterBar'
import Card from './Card'


function MainPage() {
    const [imgGot, setimgGot] = useState("https://source.unsplash.com/random/400x400")
    const  [cardData, setCardData] = useState({
        img : imgGot,
        title: "Apple",
        price: "2123",
        states : ["Uttar Pradesh", "Maharashtra", "Madhya Pradesh"],
    })

    return (
        <>
            <Navbar title="FarmEasy" />
            <div className="resmaintop">
                <FilterBar />
            </div>
            <div className="mainpge">
                <div className="leftmainpge">
                    <Card data = {cardData}/>
                </div>
                <div className="rightmainpge">

                </div>
            </div>
        </>
    )
}

export default MainPage