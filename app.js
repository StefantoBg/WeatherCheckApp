const express = require("express");
const https = require("https"); 
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
});

app.post('/', function(req, res) {
    
    const querry = req.body.cityName;
    const apiKey = "ce3469690024ce504d0d1f64e68722d4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+querry+"&units="+unit+"&appid="+apiKey+"";
    https.get(url, function(response){
        console.log("Your response code : " + response.statusCode + " OK");
               
        response.on("data", data => {
            const weatherData = JSON.parse(data);
            const coordinates= (weatherData.coord.lat + ", " + weatherData.coord.lon);
            const temp = weatherData.main.temp
            const weatherDscription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const nameCity = weatherData.name + ", " + weatherData.sys.country

            const iconUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write(`<h1>"The weather is currently  ${weatherDscription}"  </h1>`);
            res.write(`<h1> The temperature in ${nameCity} is ${temp} degrees Celcius <img src="${iconUrl}"></img></h1>`);
            res.write(`<h2> Copy and paste : ${coordinates}  in <a href="https://www.google.com/maps">GoogleMaps</a> to see where is this city located</h1>`);
            res.send();
            
        });
            
        });
   
});
app.listen(3000, function(err) {
    if(err)console.log(err);
    console.log("Server is running on htps://localhost:3000 ! ");
})
