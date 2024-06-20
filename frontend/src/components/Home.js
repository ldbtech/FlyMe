import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']; // Initial list of cities

const Home = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [newCity, setNewCity] = useState('');
    const [savedCities, setSavedCities] = useState(() => {
        // Load cities from local storage on initial render
        const storedCities = localStorage.getItem('savedCities');
        return storedCities ? JSON.parse(storedCities) : [];
    });

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const promises = savedCities.map(city => {
                    return axios.get('http://localhost:4504/api/weather', {
                        params: {
                            cityName: city
                        }
                    });
                });

                const responses = await Promise.all(promises);
                const weatherDataArray = responses.map(response => response.data);
                setWeatherData(weatherDataArray);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                // Handle error if needed
            }
        };

        fetchWeatherData();
    }, [savedCities]); // Triggered on changes to savedCities array

    const handleAddCity = async () => {
        try {
            const response = await axios.get('http://localhost:4504/api/weather', {
                params: {
                    cityName: newCity
                }
            });

            const newWeatherData = response.data;
            setWeatherData(prevWeatherData => [...prevWeatherData, newWeatherData]);
            setSavedCities(prevSavedCities => [...prevSavedCities, newCity]);
