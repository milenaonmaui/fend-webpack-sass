var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()
const API_KEY = process.env.API_KEY
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
projectData = {zip: 90000};

const app = express()
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
    console.log(API_KEY)
})

app.get('/test', function (req, res) {
    getWeatherData(baseURL, projectData.zip, API_KEY)
    .then(json => res.send(json))
})

app.post('/test', function (req, res) {
    console.log("POST request body: ", req.body)
    projectData.zip = parseInt(req.body.zip);
    res.send(projectData)
})

const getWeatherData = async(baseURL, zip=90000, API_KEY) => { 
    console.log("Inside get weather data")
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    try {
        const response = await fetch(url)
        const json = await response.json()
        console.log("Response", json)
        return json;
    } catch (error) {
        console.log(error);
    }   
}
