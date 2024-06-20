const express = require('express');
const weatherAPI = require('./Microsevices/Weather');
const { PythonShell } = require('python-shell');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());


app.use('/api/weather', (req, res) => {
    const cityName = req.query.cityName;
    if (!cityName) {
        return res.status(400).json({ error: 'City Name required' });
    }

    weatherAPI.getWeatherData(cityNam