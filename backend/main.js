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

    weatherAPI.getWeatherData(cityName)
        .then(weatherData => {
            res.json(weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data', error);
            res.status(500).json({ error: 'Failed to fetch weather data' });
        });
});

app.get('/api/models', (req, res) => {
    PythonShell.run("./model/model.py", null, function (err, results) {
        if (err) throw err;
        res.json({ model: results })
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const PORT = process.env.PORT || 4504;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});