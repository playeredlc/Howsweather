require('dotenv').config()

let config = {};

config.api = {
    units: 'metrics',
    getWeatherURL: (location) => {
        return 'https://api.openweathermap.org/data/2.5/weather?q='+ location +'&appid='+ process.env.API_KEY +'&units=' + config.api.units;
    },
    getForecastURL: (location) => {
        return 'https://api.openweathermap.org/data/2.5/forecast?q='+ location +'&appid='+ process.env.API_KEY + '&units=' + config.api.units;
    }
};

module.exports = config;