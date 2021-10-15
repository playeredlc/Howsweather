const config = require(__dirname + '/../config/config');

// suggested way (node-fetch docs) to import node-fetch (ESM-only, thus not possible to use require).
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.getWeatherData = async (location) => {
	const URL = config.api.getWeatherURL(location);

	try {	
		const response = await fetch(URL);
		const data = await response.json();
	
		return data;

	} catch (err) {
		return err.message || 'Unexpected error.';
	}
};

exports.getForecastData = async (location) => {
	const URL = config.api.getForecastURL(location);

	try {
		const response = await fetch(URL);
		const data = await response.json();
		
		return data;

	} catch (err) {
		return err.message || 'Unexpected error.';
	}
};