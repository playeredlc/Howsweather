const https = require('https');

exports.getCurrentWeatherData = (URL, callback) => {
  https.get(URL, (response) => {
    response.on('data', (currData) => {
      const currentData = JSON.parse(currData);
      if(currentData.cod == 200){
        const currentDtDate = new Date(currentData.dt*1000);
        const currentWeatherData = {
          description: currentData.weather[0].description,
          temp: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          tempMin: Math.round(currentData.main.temp_min),
          tempMax: Math.round(currentData.main.temp_max),
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          location: currentData.name,
          iconURL:'http://openweathermap.org/img/wn/'+ currentData.weather[0].icon +'@4x.png',
          date: currentDtDate.toLocaleString("en-US", {weekday: 'long', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'})
        };
        callback(currentWeatherData);
        // return currentWeatherData;
      }else {
        callback(currentData.cod);
        // return currentData.cod;
      }
    });
  });
};

exports.getForecastWeatherData = (URL, callback) => {
  https.get(URL, (response) => {
    response.on('data', (foreData) => {
      const forecastData = JSON.parse(foreData);
      if(forecastData.cod == 200){  
        
        const graphicsData = new Array();
        const forecastWeatherData = new Array();
        var day=0;
        graphicsData[day] = new Array();
        
        //CHECK IF THERE'S NOT ENOUGH DATA ON THE LAST DAY
        const firstElementHour = forecastData.list[0].dt_txt.slice(11,13);
        if(firstElementHour <= '12' && firstElementHour != '00'){
          var missData = true;
          var lastDayChoice = String((Number(firstElementHour)-3));
        }
        
        forecastData.list.forEach(element => {          
          //GENERAL INFORMATION FOR EACH DAY
          
          //NOT ENOUGH DATA ON THE LAST DAY HANDLER
          if(missData===true && day==5 && element.dt_txt.slice(12,13) == lastDayChoice){
            const forecastDtDate = new Date(element.dt*1000);
            forecastWeatherData[day-1] = {
              description: element.weather[0].description,
              temp: Math.round(element.main.temp),
              tempMin: Math.round(element.main.temp_min),
              tempMax: Math.round(element.main.temp_max),
              humidity: element.main.humidity,
              windSpeed: element.wind.speed,
              pop: Math.round(100*element.pop),
              location: forecastData.city.name,
              iconURL: 'http://openweathermap.org/img/wn/'+ element.weather[0].icon + '@4x.png',
              date: forecastDtDate.toLocaleString("en-US", {weekday: 'short', month: 'short', day: '2-digit'})
            };     
          }

          //REGULAR CASES
          if(element.dt_txt.slice(11,13) === '12'){
            const forecastDtDate = new Date(element.dt*1000);
            if(day!=0){
              forecastWeatherData[day-1] = {
                description: element.weather[0].description,
                temp: Math.round(element.main.temp),
                tempMin: Math.round(element.main.temp_min),
                tempMax: Math.round(element.main.temp_max),
                humidity: element.main.humidity,
                windSpeed: element.wind.speed,
                pop: Math.round(100*element.pop),
                location: forecastData.city.name,
                iconURL: 'http://openweathermap.org/img/wn/'+ element.weather[0].icon + '@4x.png',
                date: forecastDtDate.toLocaleString("en-US", {weekday: 'short', month: 'short', day: '2-digit'})
              };
            }
          }
          // 3-HOURLY TEMPERATURE FOR EACH DAY
          if(element.dt_txt.slice(11,13) === '00' && (graphicsData[0][0] !== null)){
            day++;
            graphicsData[day] = new Array();
          }
          graphicsData[day].push(Math.round(element.main.temp));
        });
        const results = new Array();
        results.push(forecastWeatherData);
        results.push(graphicsData);
        callback(results);
        // return results;
      }
      else{
        callback(forecastData.cod);
        // return forecastData.cod;
      }
    });
  });
};