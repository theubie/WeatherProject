const serverPort = 3000;
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html");
  //res.send("Server running.");
});
app.post("/",function(req,res) {
  //Get the weather data
  var query = req.body.cityName;
  var units = "Imperial";
  const apiKey = "YOUR_APP_ID_API_KEY_HERE";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;
  https.get(url, function(response) {
    console.log("Call to weather API returned " + response.statusCode);
    //Check the body
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      const city = weatherData.name;

      res.write("<h1>The temperature in " + city + " is " + temp + "F</h1>");
      res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src='" + weatherIconUrl + "'>");
      res.send();

    });
  });
});




app.listen(serverPort, function() {
  console.log("Server is running on port " + serverPort);
});
