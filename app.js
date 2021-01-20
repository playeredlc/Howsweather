require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    currentData: "This is the data on current weather.",
    forecastData: "This is the on the forecast."
  });
});

app.post('/', (req, res) => {
  const units = 'metric';
  const currentURL = 'https://api.openweathermap.org/data/2.5/weather?q='+ req.body.cityName +'&appid='+ process.env.API_KEY +'&units=' + units;
  const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ req.body.cityName +'&appid='+ process.env.API_KEY + '&units=' +units;

  https.get(currentURL, (response) => {
    response.on('data', (currData) => {
      const currentData = JSON.parse(currData);
      if(currentData.cod == 200){
        console.log(currentData);
      }
      else{
        console.log(currentData.cod);
      }
    })
  });
  https.get(forecastURL, (response) => {
    response.on('data', (foreData) => {
      const forecastData = JSON.parse(foreData);
      if(forecastData.cod == 200){
        console.log(forecastData);
      }
      else{
        console.log(forecastData.cod);
      }
    });
  });

});

app.listen(port, () => {
  console.log('started at port '+port);
});