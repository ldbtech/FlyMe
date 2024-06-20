import React, { useState } from 'react';

const Simulation = () => {
    const [temperature, setTemperature] = useState(20); // Celsius
    const [precipitation, setPrecipitation] = useState(0); // mm
    const [windSpeed, setWindSpeed] = useState(10); // km/h
    const [weatherCondition, setWeatherCondition] = useState('Clear'); // Clear, Rain, Snow
    const [flightDelay, setFlightDelay] = useState('On Time');

    const calculateFlightDelay = () => {
        if (
            precipitation > 50 ||
            windSpeed > 70 ||
            temperature < -10 ||
            temperature > 40 ||
            weatherCondition === 'Snow' ||
            (weatherCondition === 'Rain' && precipitation > 30)
        ) {
            setFlightDelay('Delayed');
        } else {
            setFlightDelay('On Time');
        }
    };

    const handleTemperatureChange = (e) => {
        setTemperature(e.target.value);
        calculateFlightDelay();
    };

    const handlePrecipitationChange = (e) => {
        setPrecipitation(e.target.value);
        calculateFlightDelay();
    };

    const handleWindSpeedChange = (e) => {
        setWindSpeed(e.target.value);
        calculateFlightDelay();
    };

    const handleWeatherConditionChange = (e) => {
        setWeatherCondition(e.target.value);
        calculateFlightDelay();
    };

    return (
        <div className="container mx-auto mt-12 px-4">
            <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Weather Simulation</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Adjust Weather Conditions</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Temperature (°C):</label>
                        <input
                            type="range"
                            min="-20"
                            max="50"
                            value={temperature}
                            onChange={handleTemperatureChange}
                            className="w-full"
                        />
                        <span>{temperature}°C</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Precipitation (mm):</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={precipitation}
                            onChange={handlePrecipitationChange}
                            className="w-full"
                        />
                        <span>{precipitation} mm</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Wind Speed (km/h):</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={windSpeed}
                            onChange={handleWindSpeedChange}
                            className="w-full"
                        />
                        <span>{windSpeed} km/h</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Weather Condition:</label>
                        <select
                            value={weatherCondition}
                            onChange={handleWeatherConditionChange}
                            className="w-full border p-2"
                        >
                            <option value="Clear">Clear</option>
                            <option value="Rain">Rain</option>
                            <option value="Snow">Snow</option>
                        </select>
                    </div>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Flight Status</h2>
                    <div className="text-center">
                        <p className={`text-4xl font-extrabold ${flightDelay === 'Delayed' ? 'text-red-600' : 'text-green-600'}`}>
                            {flightDelay}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulation;
