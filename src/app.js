const express = require('express');

const bodyParser = require('body-parser');
const getData = require(__dirname + '/get-data.js');
const config = require(__dirname + '/config/config.js');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {

  const currentURL = config.api.getWeatherURL(req.body.cityName);
  const forecastURL = config.api.getForecastURL(req.body.cityName);
  
  getData.getCurrentWeatherData(currentURL, (err, result) => {
    if(err){
      console.log(err);
      res.redirect('/');
    }else{
      var myWeatherData = result;
      getData.getForecastWeatherData(forecastURL, (err, result) => {
        if(err){
          console.log(err);
          res.redirect('/');
        }else{
          var myForecastData = result;
          res.render('show-info', {
            currentData: myWeatherData,
            forecastData: myForecastData[0],
            graphicsData: myForecastData[1]
          });
        }
      });
    }
  });  
});

module.exports = app;