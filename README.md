<h1 align="center">
	<img src="https://github.com/playeredlc/Howsweather/blob/master/src/public/images/howsweather-logo.svg">
</h1>

<div align="center">

<strong>
	Are you wondering how's the weather? Or how's the weather going to be like the next days?<br>
	<i>Howsweather</i> is the place to go!
</strong>

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/playeredlc/Howsweather/blob/master/LICENSE)

Check online: [howsweather.herokuapp.com](https://howsweather.herokuapp.com/)

[About](#about)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[Features](#features)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[Layout](#layout)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[Tech](#technologies)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
[How to run](#running-locally)

</div>

## About
Howsweather is a web application that connects to [OpenWeather API](https://openweathermap.org/api) to gather information about the current and forecast weather for any location. It counts with intuitive UI to display that information.

This project was developed in order to apply some knowledge about connections with external APIs, turning the data received as response in something useful.

During the development of this project I could improve my understanding of how communication between servers work. As well as some important aspects of organization, not only about the incoming data but also about the code structure in general.

## Features
* Updated information about the current weather;
* Forecast information for the next days;
* Graphics on temperature with a 3-hour step;

## Technologies

### Back-end
* [Nodejs](https://nodejs.org/en/) with [Express](https://expressjs.com/)
* [OpenWeather API](https://openweathermap.org/api)
* [Node-Fetch](https://www.npmjs.com/package/node-fetch)

### Front-end
* HTML / CSS / JavaScript
* [Bootstrap](https://getbootstrap.com/)
* [Chart.js](https://www.chartjs.org/)
* [EJS](https://ejs.co/)

### Deployment
* [Heroku](https://devcenter.heroku.com/)

## Running Locally
#### Pre-requisites
To run this application you'll need [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [Node](https://nodejs.org/en/download/) with NPM (or yarn) installed.

#### Environment variables
You will need to create your own [API KEY](https://openweathermap.org/appid#apikey) from OpenWeather in order to make calls for data.

Once you have your key in hands, you must create a .env file in the root of the project informing your key, as specified in the .env.example file.

```bash
# clone the repository
$ git clone https://github.com/playeredlc/Howsweather

# go into the project root
cd Howsweather

# install dependencies using NPM or Yarn
$ npm install
# or
$ yarn install

# run the server
$ node server.js

# you will find your server running on localhost at port 3000.
# http://localhost:3000/

```

<hr>

<strong><i> </> </i></strong> Developed by <strong>edlc</strong>. [Get in touch!](https://github.com/playeredlc) :metal:

<br>