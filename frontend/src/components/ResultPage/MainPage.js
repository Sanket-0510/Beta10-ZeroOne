import React, { useContext, useEffect, useState } from 'react'
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
import NewContext from '../../Context/NewContext'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);



function MainPage() {
    const context = useContext(NewContext)
    const { filterData, setfilterData, foreCasting, setforeCasting } = context

    console.log(filterData)
    useEffect(() => {
        getTrend()
    }, [filterData])

    const getTrend = async () => {
        if (!filterData) {
            return;
        }
        console.log("adsa",filterData[0])
        const res = await fetch("http://10.12.88.32:8000/cv/predict", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: filterData[0].ndtd_Modal_Price == "Not found"? 0 : filterData[0].ndtd_Modal_Price, commodity:''})
        })

        let data =await res.json();
        console.log('data', data)
        setforeCasting(data);
    }

    console.log(filterData)

  
    // const [cardData, setCardData] = useState({
    //     img: imgGot,
    //     title: "Apple",
    //     price: "2123",
    //     states: ["Uttar Pradesh", "Maharashtra", "Madhya Pradesh"],
    // })

    const prices = [20, 21, 25];

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            labels: 'Sales price of the week',
            data: foreCasting.result,
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
                    <Card data={filterData[0]} />
                    <div className="leftmaingraph" >
                        <Line
                            data={data}
                            options={options} style={{marginLeft:'15%'}}></Line>
                    </div>
                </div>
                <div className="rightmainpge">
                    <h1>Forecasting</h1>
                    <div className="content">
                        <h2>Today's Price : {filterData[0].ndtd_Modal_Price}</h2>
                        <Table prices={foreCasting} />
                        <Modal />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage