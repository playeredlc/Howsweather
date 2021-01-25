require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const getData = require(__dirname+'/get-data.js');

const {performance} = require('perf_hooks');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const units = 'metric';
  const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.body.cityName +'&appid='+ process.env.API_KEY +'&units=' + units;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ req.body.cityName +'&appid='+ process.env.API_KEY + '&units=' +units;

  getData.getCurrentWeatherData(currentURL, (result) => {
    var myWeatherData = result;
    getData.getForecastWeatherData(forecastURL, (result) => {
      var myForecastData = result;
      res.render('show-info', {
        currentData: myWeatherData,
        forecastData: myForecastData[0],
        graphicsData: myForecastData[1]
      });
    });
  });  
});

app.listen(port, () => {
  console.log('started at port '+port);
});

// FAKE DATA FOR TSTS.
const fakeCurrentData = {
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

const fakeGraphicsData = [
  [28],
  [25, 24, 22, 22, 27, 31, 32, 30],
  [26, 25, 24, 24, 28, 34, 32, 31],
  [28, 25, 25, 24, 28, 35, 35, 31],
  [29, 27, 25, 24, 28, 34, 34, 32],
  [29, 27, 26, 26, 30, 34, 33]
];

const fakeForecastData = [
  {
    description: 'clear sky',
    temp: 27,
    tempMin: 27,
    tempMax: 27,
    humidity: 60,
    windSpeed: 1.66,
    pop: 0,
    location: 'Porto Alegre',
    iconURL: 'http://openweathermap.org/img/wn/01d@4x.png',
    date: 'Sat, Jan 23'
  },
  {
    description: 'clear sky',
    temp: 28,
    tempMin: 28,
    tempMax: 28,
    humidity: 57,
    windSpeed: 2.85,
    pop: 0.11,
    location: 'Porto Alegre',
    iconURL: 'http://openweathermap.org/img/wn/01d@4x.png',
    date: 'Sun, Jan 24'
  },
  {
    description: 'clear sky',
    temp: 28,
    tempMin: 28,
    tempMax: 28,
    humidity: 55,
    windSpeed: 2.41,
    pop: 0,
    location: 'Porto Alegre',
    iconURL: 'http://openweathermap.org/img/wn/01d@4x.png',
    date: 'Mon, Jan 25'
  },
  {
    description: 'clear sky',
    temp: 28,
    tempMin: 28,
    tempMax: 28,
    humidity: 57,
    windSpeed: 3.42,
    pop: 0,
    location: 'Porto Alegre',
    iconURL: 'http://openweathermap.org/img/wn/01d@4x.png',
    date: 'Tue, Jan 26'
  },
  {
    description: 'broken clouds',
    temp: 30,
    tempMin: 30,
    tempMax: 30,
    humidity: 54,
    windSpeed: 4.61,
    pop: 0.03,
    location: 'Porto Alegre',
    iconURL: 'http://openweathermap.org/img/wn/04d@4x.png',
    date: 'Wed, Jan 27'
  }
];