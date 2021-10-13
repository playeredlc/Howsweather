const getData = require(__dirname + '/../get-data');
const config = require(__dirname + '/../config/config');

exports.showInitialScreen = async (req, res) => {
    res.render('index');
};

exports.showWeather = async(req, res) => {
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
};