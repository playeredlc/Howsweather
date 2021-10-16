const WeatherInformation = require(__dirname + '/../entities/WeatherInformation');
const ForecastWeatherInfo = require(__dirname + '/../entities/ForecastWeatherInfo');

const openWeatherProvider = require(__dirname + '/../providers/openWeatherProvider');

exports.showInitialScreen = async (req, res) => {
    res.render('index');
};

exports.showWeather = async (req, res) => {
	
	const weatherData = await openWeatherProvider.getWeatherData(req.body.cityName);
	const forecastData = await openWeatherProvider.getForecastData(req.body.cityName);

	const weatherObject = new WeatherInformation(weatherData);
	const forecastObject = new ForecastWeatherInfo(forecastData);

	res.render('show-info', {
		currentData: weatherObject.data,
		forecastData: forecastObject.forecastData,
		graphicsData: forecastObject.hourlyTempGraphs,
	});

};
