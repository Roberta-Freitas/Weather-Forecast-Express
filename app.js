require('dotenv').config();
const express = require("express");
const https = require('https');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey + "";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function (data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/"+ (icon) +"@2x.png";
      const htmlResponse = `
      <div class="container mt-4">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Weather Forecast for ${query}</h2>
            <p class="card-text">Temperature: ${temp} degrees Celsius</p>
            <p class="card-text">Weather Description: ${weatherDescription}</p>
            <img src="${imageUrl}" alt="Weather Icon" class="img-fluid">
          </div>
        </div>
      </div>
    `;
        res.send(htmlResponse);
    });
  });
});


app.listen(3000, function () {
  console.log("Running on localhost 3000");
});
