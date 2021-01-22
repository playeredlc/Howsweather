require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

var currentWeatherData = {};
const forecastWeatherData = {};
const graphicsData = new Array();

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
    forecastData: 'This is the on the forecast.'
  });
});

app.post('/', (req, res) => {
  const units = 'metric';
  const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.body.cityName +'&appid='+ process.env.API_KEY +'&units=' + units;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ req.body.cityName +'&appid='+ process.env.API_KEY + '&units=' +units;

  // REQUEST ON CURRENT DATA
  https.get(currentURL, (response) => {
    response.on('data', (currData) => {
      const currentData = JSON.parse(currData);
      if(currentData.cod == 200){
        const currentDtDate = new Date(currentData.dt*1000);
        currentWeatherData = {
          description: currentData.weather[0].description,
          temp: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          tempMin: Math.round(currentData.main.temp_min),
          tempMax: Math.round(currentData.main.temp_max),
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          // pop: currentData.pop,
          location: currentData.name,
          iconURL:'http://openweathermap.org/img/wn/'+ currentData.weather[0].icon +'@4x.png',
          date: currentDtDate.toLocaleString("en-US", {weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})
        };
        console.log(currentWeatherData);
      }
        else{
        console.log(currentData.cod);
      }
    })
  });

  // REQUEST ON FORECAST DATA
  https.get(forecastURL, (response) => {
    response.on('data', (foreData) => {
      const forecastData = JSON.parse(foreData);
      if(forecastData.cod == 200){    
        var day=0;
        graphicsData[day] = new Array();
        forecastData.list.forEach(element => {          
          //GENERAL INFORMATION FOR EACH DAY
          if(element.dt_txt.slice(11,13) === '12' && (forecastWeatherData[0] !== null)){
            const forecastDtDate = new Date(element.dt*1000);
            forecastWeatherData[day] = {
              description: element.weather[0].description,
              temp: Math.round(element.main.temp),
              tempMin: Math.round(element.main.temp_min),
              tempMax: Math.round(element.main.temp_max),
              humidity: element.main.humidity,
              windSpeed: element.wind.speed,
              pop: element.pop,
              location: forecastData.city.name,
              iconURL: 'http://openweathermap.org/img/wn/'+ element.weather[0].icon + '@4x.png',
              date: forecastDtDate.toLocaleString("en-US", {weekday: 'short', month: 'short', day: '2-digit'})
            };
          }
          // 3-HOURLY TEMPERATURE FOR EACH DAY
          if(element.dt_txt.slice(11,13) === '00' && (graphicsData[0][0] !== null)){
            day++;
            graphicsData[day] = new Array();
          }
          graphicsData[day].push(Math.round(element.main.temp));
        });
        console.log(forecastWeatherData);
        console.log(graphicsData);
      }
      else{
        console.log(forecastData.cod);
      }
    });
  });

  res.render('index', {
    currentData: fakeData,
    forecastData: 'forecast data.'
  });

});

app.listen(port, () => {
  console.log('started at port '+port);
});