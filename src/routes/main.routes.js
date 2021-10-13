const router = require('express').Router();

const getData = require(__dirname + '/../get-data.js');
const config = require(__dirname + '/../config/config.js');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {
	
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

module.exports = router;