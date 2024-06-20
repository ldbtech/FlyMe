const { OpenWeatherAPI } = require('openweather-api-node');

const api_key = '8954c2aae751138e740364056576c409';

const weather = new OpenWeatherAPI({
    key: api_key,
    units: 'metric' // Units can be "metric" for Celsius or "imperial" for Fahrenheit
});

const getWeatherData = (cityName) => {
    return new Promise((resolve, reject) => {
        // Set the locationName dynamically based on the cityName
        weather.setLocationByName(cityName);

        weather.getCurrent()
            .then(data => {
                const weatherData = {
                    temperature: data.weather.temp.cur,
                    description: data.weather.description,
                    humidity: data.weather.humidity
                    // Add more properties as needed
                };
                resolve(weatherData);
            })
            .catch(error => {
                console.error('Error fetching current weather:', error);
                reject(error);
            });
    });
};

module.exports = {
    getWeatherData
};
