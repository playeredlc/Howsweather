const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

app.get("/", (req, res) => {

  //static api parameter as Porto Alegre
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Porto%20Alegre&appid=5e92290d879a5d4bd682287d75519d87&units=metric";
  https.get(url, (response) => { //request data from the API Server (external server)
    response.on("data", (d) => { //when data is received (hex format)
      resData = JSON.parse(d);  
    
      var imgURL= "http://openweathermap.org/img/wn/"+ resData.weather[0].icon +"@2x.png"  
      var displayTemp = "Temperature in "+resData.name+" is "+Math.floor(resData.main.temp)+" °C."
      var displayDescript = ((resData.weather[0].description).slice(0,1)).toUpperCase() + (resData.weather[0].description).slice(1,(resData.weather[0].description).length);
      
      //SEND BACK TO BROWSER
      res.type("html");
      
      res.write("<h1>");
      res.write(displayTemp + " ");
      res.write(displayDescript + ".");
      res.write("</h1>");
      res.write("<img src='"+imgURL+"' alt='Weather-Image'>")
      res.send();
    
    });
  
  });

});


app.listen(port, () => {
  console.log("started at port "+port);
});