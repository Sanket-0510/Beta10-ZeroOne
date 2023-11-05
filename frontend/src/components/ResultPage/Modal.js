import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import './Modal.css'

const API_KEY = "cb7f415e8a36f048b70a2aa8c574afbf";

function Modal() {

    const Navigate = useNavigate();

    const [cityInput, setCity] = useState("Bhopal")
    // const cityInput = document.querySelector(".city-input");
    const searchButton = document.querySelector(".search-btn");
    const locationButton = document.querySelector(".location-btn");
    const currentWeatherDiv = document.querySelector(".current-weather");
    const weatherCardsDiv = document.querySelector(".weather-cards");

    const createWeatherCard = (cityName, weatherItem, index) => {
        if (index === 0) { // HTML for the main weather card
            return `<div class="details">
                        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                        <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                    </div>
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                        <h6>${weatherItem.weather[0].description}</h6>
                    </div>`;
        } else { // HTML for the other five day forecast card
            return `<li class="card">
                        <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                        <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                    </li>`;
        }
    }
    const getWeatherDetails = (cityName, latitude, longitude) => {
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

        fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
            // Filter the forecasts to get only one forecast per day
            const uniqueForecastDays = [];
            const fiveDaysForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    return uniqueForecastDays.push(forecastDate);
                }
            });

            // Clearing previous weather data
            setCity("Bhopal");
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            // Creating weather cards and adding them to the DOM
            fiveDaysForecast.forEach((weatherItem, index) => {
                const html = createWeatherCard(cityName, weatherItem, index);
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        }).catch(() => {
            alert("An error occurred while fetching the weather forecast!");
        });
    }
    const getCityCoordinates = () => {
        const cityName = cityInput.trim();
        console.log(cityInput)
        if (cityName === "") return;
        const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

        // Get entered city coordinates (latitude, longitude, and name) from the API response
        fetch(API_URL).then(response => response.json()).then(data => {
            if (!data.length) return alert(`No coordinates found for ${cityName}`);
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
        }).catch(() => {
            alert("An error occurred while fetching the coordinates!");
        });
    }
    const getUserCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords; // Get coordinates of user location
                // Get city name from coordinates using reverse geocoding API
                const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
                fetch(API_URL).then(response => response.json()).then(data => {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                }).catch(() => {
                    alert("An error occurred while fetching the city name!");
                });
            },
            error => { // Show alert if user denied the location permission
                if (error.code === error.PERMISSION_DENIED) {
                    alert("Geolocation request denied. Please reset location permission to grant access again.");
                } else {
                    alert("Geolocation request error. Please reset location permission.");
                }
            });
    }

    return (
        <>
            <div className='Mdal' style={{ width: '90%' }}>
                <button type="button" className="btn btn-outline-success btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    View Detailed Prices
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Weather</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="weather-input">
                                        <h3>Enter a City Name</h3>
                                        <input className="city-input" type="text" onChange={(e) => setCity(e.target.value)} placeholder="E.g., New York, London, Tokyo" />
                                        <button className="search-btn" onClick={getCityCoordinates}>Search</button>
                                        <div className="separator"></div>
                                        <button className="location-btn" onClick={getUserCoordinates}>Use Current Location</button>
                                    </div>
                                    <div className="weather-data">
                                        <div className="current-weather">
                                            <div className="details">
                                                <h2>_______ ( ______ )</h2>
                                                <h6>Temperature: __°C</h6>
                                                <h6>Wind: __ M/S</h6>
                                                <h6>Humidity: __%</h6>
                                            </div>
                                        </div>
                                        <div className="days-forecast">
                                            <h2>5-Day Forecast</h2>
                                            <ul className="weather-cards">
                                                <li className="card">
                                                    <h3>( ______ )</h3>
                                                    <h6>Temp: __C</h6>
                                                    <h6>Wind: __ M/S</h6>
                                                    <h6>Humidity: __%</h6>
                                                </li>
                                                <li className="card">
                                                    <h3>( ______ )</h3>
                                                    <h6>Temp: __C</h6>
                                                    <h6>Wind: __ M/S</h6>
                                                    <h6>Humidity: __%</h6>
                                                </li>
                                                <li className="card">
                                                    <h3>( ______ )</h3>
                                                    <h6>Temp: __C</h6>
                                                    <h6>Wind: __ M/S</h6>
                                                    <h6>Humidity: __%</h6>
                                                </li>
                                                <li className="card">
                                                    <h3>( ______ )</h3>
                                                    <h6>Temp: __C</h6>
                                                    <h6>Wind: __ M/S</h6>
                                                    <h6>Humidity: __%</h6>
                                                </li>
                                                <li className="card">
                                                    <h3>( ______ )</h3>
                                                    <h6>Temp: __C</h6>
                                                    <h6>Wind: __ M/S</h6>
                                                    <h6>Humidity: __%</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div></div>
        </>
    )
}

export default Modal