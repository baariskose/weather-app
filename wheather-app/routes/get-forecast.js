const express = require('express');
const axios = require('axios');
const router = express.Router();

const notImplementedHandler = async (req, res) => {
  res.status(405).end()//sendFile(invalidRoutePath);
};


router.post('/', async (req, res) => {
  try {
   
    const { latitude, longitude } = req.body;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const response = await axios.get(apiUrl);
    const forecastData = response.data;
    // console.log(forecastData)
    const formattedForecast = forecastData.daily.time.map((date, index) => ({
      date,
      max: forecastData.daily.temperature_2m_max[index],
      min: forecastData.daily.temperature_2m_min[index],
      weather: getWeatherDescription(forecastData.daily.weathercode[index]),
    }));

    //res.json(formattedForecast);
    return res.json(formattedForecast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the forecast' });
  }
});
router.get("/", notImplementedHandler);
router.put("/", notImplementedHandler);
router.patch("/", notImplementedHandler);
router.delete("/", notImplementedHandler);
router.post("/", notImplementedHandler);

const getWeatherDescription = (weatherCode) => {
  const weatherCodes = {
    0: 'Clear Sky',
    1: 'Sunny',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    71: 'Snowy',
    80: 'Rainy',
    96: 'Thunderstorm'
  };
  return weatherCodes[weatherCode] || 'Unknown';
};



module.exports = router;