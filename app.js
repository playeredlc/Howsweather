require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

var currentWeatherData = {};
const forecastWeatherData = new Array();
const graphicsData = new Array();

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

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    currentData: fakeCurrentData,
    forecastData: fakeForecastData,
    graphicsData: fakeGraphicsData
  });
});

app.post('/', (req, res) => {
  const units = 'metric';
  const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.body.cityName +'&appid='+ process.env.API_KEY +'&units=' + units;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ req.body.cityName +'&appid='+ process.env.API_KEY + '&units=' +units;

  // // REQUEST ON CURRENT DATA
  // https.get(currentURL, (response) => {
  //   response.on('data', (currData) => {
  //     const currentData = JSON.parse(currData);
  //     if(currentData.cod == 200){
  //       const currentDtDate = new Date(currentData.dt*1000);
  //       currentWeatherData = {
  //         description: currentData.weather[0].description,
  //         temp: Math.round(currentData.main.temp),
  //         feelsLike: Math.round(currentData.main.feels_like),
  //         tempMin: Math.round(currentData.main.temp_min),
  //         tempMax: Math.round(currentData.main.temp_max),
  //         humidity: currentData.main.humidity,
  //         windSpeed: currentData.wind.speed,
  //         location: currentData.name,
  //         iconURL:'http://openweathermap.org/img/wn/'+ currentData.weather[0].icon +'@4x.png',
  //         date: currentDtDate.toLocaleString("en-US", {weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})
  //       };
  //       console.log(currentWeatherData);
  //     }
  //       else{
  //       console.log(currentData.cod);
  //     }
  //   })
  // });

  // // REQUEST ON FORECAST DATA
  // https.get(forecastURL, (response) => {
  //   response.on('data', (foreData) => {
  //     const forecastData = JSON.parse(foreData);
  //     if(forecastData.cod == 200){    
  //       var day=0;
  //       graphicsData[day] = new Array();
  //       forecastData.list.forEach(element => {          
  //         //GENERAL INFORMATION FOR EACH DAY
  //         if(element.dt_txt.slice(11,13) === '12' && (forecastWeatherData[0] !== null)){
  //           const forecastDtDate = new Date(element.dt*1000);
  //           forecastWeatherData[day-1] = {
  //             description: element.weather[0].description,
  //             temp: Math.round(element.main.temp),
  //             tempMin: Math.round(element.main.temp_min),
  //             tempMax: Math.round(element.main.temp_max),
  //             humidity: element.main.humidity,
  //             windSpeed: element.wind.speed,
  //             pop: element.pop,
  //             location: forecastData.city.name,
  //             iconURL: 'http://openweathermap.org/img/wn/'+ element.weather[0].icon + '@4x.png',
  //             date: forecastDtDate.toLocaleString("en-US", {weekday: 'short', month: 'short', day: '2-digit'})
  //           };
  //         }
  //         // 3-HOURLY TEMPERATURE FOR EACH DAY
  //         if(element.dt_txt.slice(11,13) === '00' && (graphicsData[0][0] !== null)){
  //           day++;
  //           graphicsData[day] = new Array();
  //         }
  //         graphicsData[day].push(Math.round(element.main.temp));
  //       });
  //       console.log(forecastWeatherData);
  //       console.log(graphicsData);
  //     }
  //     else{
  //       console.log(forecastData.cod);
  //     }
  //   });
  // });
  
  console.log(fakeCurrentData);
  console.log(fakeForecastData);
  console.log(fakeGraphicsData);
  res.render('index', {
    currentData: fakeCurrentData,
    forecastData: fakeForecastData,
    graphicsData: fakeGraphicsData
  });
});

app.listen(port, () => {
  console.log('started at port '+port);
});