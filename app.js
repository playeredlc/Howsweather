require('dotenv').config()
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

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

// app.post('/', (req, res) => { //deal with post request coming from the browser (input element)
  
//   var query = req.body.cityName;
//   var unitSystem = 'metric'; 
//   var apiKey = process.env.API_KEY;
//   const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid='+ apiKey +'&units=' + unitSystem;
  
//   https.get(url, (response) => { //request data from the API Server (external server)
    
//     response.on('data', (d) => { //when data is received (hex format)
//       resData = JSON.parse(d);  
//       if(resData.cod == 200){
//         var imgURL= 'http://openweathermap.org/img/wn/'+ resData.weather[0].icon +'@2x.png'  
//         var displayTemp = 'Temperature in '+resData.name+' is '+Math.floor(resData.main.temp)+' °C.'
//         var displayDescript = ((resData.weather[0].description).slice(0,1)).toUpperCase() + (resData.weather[0].description).slice(1,(resData.weather[0].description).length);
        
//         //SEND BACK TO BROWSER
//         res.type('html');        
//         res.write('<h1>');
//         res.write(displayTemp + ' ');
//         res.write(displayDescript + '.');
//         res.write('</h1>');
//         res.write('<img src=' +imgURL+ ' alt=Weather-Image>');
//         res.send();
//       }else{
//         res.send('Error '+resData.cod+'. Please reload the page.');
//       }   
//     });
//   });
// });

app.listen(port, () => {
  console.log('started at port '+port);
});