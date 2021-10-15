const WeatherInformation = require(__dirname + '/WeatherInformation');

module.exports = class ForecastWeatherInfo {

	constructor(openWeatherApiResponse) {
		
		if(openWeatherApiResponse.cod == 200) {
			const forecastList = openWeatherApiResponse.list;

			this.dayIndexes = new Array();
			this.hourlyTempGraphs = new Array();
			this.forecastData = new Array();

			this.setDayIndexes(forecastList);
			this.setHourlyGraphicsData(forecastList);
			this.setForecastData(forecastList);

			return this;
		} else if(openWeatherApiResponse.cod == 404) {
			throw new Error('City not found.');
		} else {
			throw new Error('Unexpected error.');
		}

	};

	setDayIndexes(forecastList) {	
		/*
		** Explain why this method is necessary?
		*/
		let indexArray = new Array(); // aux array to build dayIndexes array inside the loop

		let previousDay = new Date(forecastList[0].dt * 1000).getDate();
		let currentDay = previousDay;

		forecastList.forEach((dayObject, index) => {
			currentDay = new Date(dayObject.dt * 1000).getDate();
			if(currentDay != previousDay) {
				this.dayIndexes.push(indexArray);
				indexArray = [];
				previousDay++;
			} else {
				indexArray.push(index);
			}
		});
	};

	setHourlyGraphicsData(forecastList) {
		this.dayIndexes.forEach((day, index) => {
			this.hourlyTempGraphs[index] = new Array();
			day.forEach( listIndex => {
				this.hourlyTempGraphs[index].push(forecastList[listIndex].main.temp);
			});
		});
	};

	setForecastData(forecastList) {
		this.dayIndexes.forEach((indexesArray) => {
			let meanIndex = Math.floor(indexesArray.length / 2);
			this.forecastData.push(new WeatherInformation(forecastList[meanIndex]));
		});
	};

};
