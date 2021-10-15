module.exports = class WeatherInformation {
	
	constructor (openWeatherApiResponse) {

		if(openWeatherApiResponse.cod == 200) {
			
			this.data = {
				location: openWeatherApiResponse.name || null,
				pop: openWeatherApiResponse.pop || null,
				cod: openWeatherApiResponse.cod,
				dt: openWeatherApiResponse.dt,
				... openWeatherApiResponse.main,
				... openWeatherApiResponse.wind,
				... openWeatherApiResponse.weather[0],
			};

			this.roundTemperatures();
			this.setIconURL();
			this.formatDate();

			return this;
		
		} else if (openWeatherApiResponse.cod == 404) {	
			throw new Error('City not found.');
		
		} else {
			throw new Error('Unexpected error.')
		}
	
	};

	roundTemperatures() {
		this.data.temp = Math.round(this.data.temp);
		this.data.temp_min = Math.round(this.data.temp_min);
		this.data.temp_max = Math.round(this.data.temp_max);
		this.data.feels_like = Math.round(this.data.feels_like);
	};

	setIconURL() {
		this.data.iconURL = 'http://openweathermap.org/img/wn/' + this.data.icon + '@4x.png';
	};

	formatDate() {
		const dateObj = new Date(this.data.dt * 1000);
		this.data.date = dateObj.toLocaleString("en-US", {weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});
	};

};
