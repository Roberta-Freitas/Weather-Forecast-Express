require('dotenv').config();
const express = require("express");
const https = require('https');
const app = express();

const currentYear = new Date().getFullYear();
const port = process.env.PORT || 3000;

app.use(express.static('public'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});


app.post("/", function(req, res){
  const query = req.body.cityName;
  // Check if cityName is empty
  if (!query) {
    // Show an alert message and redirect back to the index page
    res.send(
      `<script>alert('Please insert the city name'); window.location.href='/';</script>`
    );
    return;
  }


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
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@^3.3.3/dist/tailwind.min.css" rel="stylesheet">
      <link href="/css/styles.css" rel="stylesheet">
      <script src="/app.js"></script>

      <div>
        <div class="card text-center p-10 rounded-xl my-10 ">
          <div class="card-body text-center">
            <h2 class="card-title ">Weather Forecast for ${query}</h2>
            <p class="card-text">Temperature: ${temp} degrees Celsius</p>
            <p class="card-text">Weather Description: ${weatherDescription}</p>
            <img class="mx-auto" src="${imageUrl}" alt="Weather Icon" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="card-footer">
        &copy; ${currentYear} Weather App
      </div>
     `;
        res.send(htmlResponse);
    });
  });
});


app.listen(port, function () {
  console.log("Running on port " + port);
});
