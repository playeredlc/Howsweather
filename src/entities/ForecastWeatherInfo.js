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
		** This method is necessary to reference the forecastList in terms of days instead of a linear list with 40 elements.
		*/
		let initialDay = new Date(forecastList[0].dt * 1000).getDate();
		let currentDay = initialDay;

		forecastList.forEach((dayObject, index) => {
			currentDay = new Date(dayObject.dt * 1000).getDate();
			let day = currentDay - initialDay;			
			
			if(this.dayIndexes[day] == undefined) {
				this.dayIndexes[day] = new Array();
				this.dayIndexes[day].push(index);
			} else {
				this.dayIndexes[day].push(index);
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
			let meanPosition = Math.floor(indexesArray.length / 2);
			let meanIndex = indexesArray[meanPosition];
			this.forecastData.push(new WeatherInformation(forecastList[meanIndex]).data);
		});
	};

};
