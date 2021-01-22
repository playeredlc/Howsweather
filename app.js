require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

var currentWeatherData = {};

var fakeData = {
  description: "Broken clouds",
  temp: 34,
  feelsLike: 38,
  tempMin: 31,
  tempMax: 35,
  humidity: 76,
  windSpeed: 123,
  location: 'Porto Alegre',
  date: 'Thursday, 21 jan, 10:50 PM.',
  iconURL: 'http://openweathermap.org/img/wn/04n@4x.png'
};

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    currentData: 'This is the date on current weather.',
    forecastData: "This is the on the forecast."
  });
});

app.post('/', (req, res) => {
  const units = 'metric';
  // const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.body.cityName +'&appid='+ process.env.API_KEY +'&units=' + units;
  // const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ req.body.cityName +'&appid='+ process.env.API_KEY + '&units=' +units;

  // https.get(currentURL, (response) => {
  //   response.on('data', (currData) => {
  //     const currentData = JSON.parse(currData);
  //     if(currentData.cod == 200){
  //       currentWeatherData.description = currentData.weather[0].description;
  //       currentWeatherData.temp = Math.round(currentData.main.temp);
  //       currentWeatherData.feelsLike = Math.round(currentData.main.feels_like);
  //       currentWeatherData.tempMin = Math.round(currentData.main.temp_min);
  //       currentWeatherData.tempMax = Math.round(currentData.main.temp_max);
  //       currentWeatherData.humidity = currentData.main.humidity;
  //       currentWeatherData.windSpeed = currentData.wind.speed;
  //       currentWeatherData.location = currentData.name;
  //       currentWeatherData.iconURL = 'http://openweathermap.org/img/wn/'+ currentData.weather[0].icon +'@4x.png';
  //       const date = new Date(currentData.dt*1000);
  //       currentWeatherData.date = date.toLocaleString("en-US", {weekday: 'long', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'});      
  //       res.render('index', {
  //         currentData: currentWeatherData,
  //         forecastData: 'forecast'
  //       });
  //     }
  //       else{
  //       console.log(currentData.cod);
  //     }
  //   })
  // });
  // https.get(forecastURL, (response) => {
  //   response.on('data', (foreData) => {
  //     const forecastData = JSON.parse(foreData);
  //     if(forecastData.cod == 200){
  //       console.log(forecastData);
  //     }
  //     else{
  //       console.log(forecastData.cod);
  //     }
  //   });
  // });
  res.render('index', {
    currentData: fakeData,
    forecastData: 'forecast data.'
  });

});

app.listen(port, () => {
  console.log('started at port '+port);
});