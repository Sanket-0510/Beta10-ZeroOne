import React, { useState } from 'react'
import Navbar from '../Navbar'
import './mstyles.css'
import FilterBar from '../TopSection/FilterBar'
import Card from './Card'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';
import Table from './Table'
import Modal from '../Modal'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



function MainPage() {

    const [imgGot, setimgGot] = useState("https://source.unsplash.com/random/400x400")
    const [cardData, setCardData] = useState({
        img: imgGot,
        title: "Apple",
        price: "2123",
        states: ["Uttar Pradesh", "Maharashtra", "Madhya Pradesh"],
    })

    const prices = [20, 21 , 25];

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            labels: 'Sales price of the week',
            data: [6, 3, 9, 9 , 4 , 4, 8],
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
           
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
            }
        }
    }
    return (
        <>
            <Navbar title="FarmEasy" />
            <div className="resmaintop">
                <FilterBar />
            </div>
            <div className="mainpge">
                <div className="leftmainpge">
                    <Card data={cardData} />
                    <div className="leftmaingraph">
                        <Line
                            data={data}
                            options={options}></Line>
                    </div>
                </div>
                <div className="rightmainpge">
                    <h1>Forecasting</h1>
                    <div className="content">
                        <h2>Today's Price : </h2>
                        <Table prices={prices}/>
                        <Modal/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage