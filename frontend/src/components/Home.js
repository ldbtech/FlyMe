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
            //setNewCity('');

            // Update local storage with new city
            localStorage.setItem('savedCities', JSON.stringify([...savedCities, newCity]));
        } catch (error) {
            console.error('Error adding city:', error);
            // Handle error if needed
        }
    };

    const handleDeleteCity = (index) => {
        const cityToDelete = savedCities[index];
        const updatedCities = savedCities.filter(city => city !== cityToDelete);
        //setSavedCities(updatedCities);

        // Update local storage with updated cities
        localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    };

    return (
        <div className="container mx-auto mt-12 px-4">
            <div className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="border rounded-lg p-3 w-full max-w-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 focus:outline-none"
                    onClick={handleAddCity}
                >
                    Add City
                </button>
            </div>
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Nearby Cities</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {weatherData.map((data, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">{savedCities[index]}</h2>
                        <p className="mb-1 text-gray-700">Weather: <span className="font-medium">{data.description}</span></p>
                        <p className="mb-1 text-gray-700">Temperature: <span className="font-medium">{data.temperature}°F</span></p>
                        <p className="text-gray-700">Humidity: <span className="font-medium">{data.humidity}%</span></p>
                        <button
                            className="bg-red-500 text-white rounded-lg p-2 mt-4 hover:bg-red-600 focus:outline-none"
                            onClick={() => handleDeleteCity(index)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

