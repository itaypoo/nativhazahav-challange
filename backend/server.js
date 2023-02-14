const querystring = require('querystring')
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const {json} = require("express");

const app = express()
const port = 8080

const planeMass = 35000    // (kg)
const flightSpeed = 140    // (m/s)
const engineForce = 100000 // (N)

const connection = mysql.createConnection({ // create a connection to the db
    host: 'db',
    user: 'dan',
    password: 'mysecretpassword',
    database: 'mydb'
});

app.use(cors())
app.get('/', (req, res) => {

    if(req.query.getPastData){
        // got a request to get all the data from the table
        connection.query('SELECT * FROM plane_data', (error, results) => {
            // get all the data from the table
            if (error) throw error;
            console.log("SERVER: Sending all data")
            res.json(results) // return the data in a JSON format
        });
    }
    else{

        const mass = parseFloat(req.query.inputMass); // get the input mass from the url
        const dateString = req.query.date; // get the date from the url

        console.log("SERVER: Received request for mass: " + mass + " and date: " + dateString)

        // call the open meteo api using "fetch()" at long/lat 30/35 with the date
        let availableHours = [];
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=30&longitude=35&hourly=temperature_2m&start_date=${dateString}&end_date=${dateString}`)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    // error calling the weather api
                    console.log("SERVER: Recived error form open meteo API: " + data.error)
                    res.end()
                }
                else{
                    // get the hourly weather data
                    const weather = data.hourly.temperature_2m;

                    // get all hours when the temperature is above 15 and below 30
                    for(let i = 0; i < weather.length; i++){
                        if(weather[i] > 15 && weather[i] < 30){
                            availableHours.push(i);
                        }
                    }

                    // get the minimum and maximum temperature
                    let minTemp = 100000000;
                    let maxTemp = -100000000;
                    for(let i = 0; i < weather.length; i++){
                        if(weather[i] > maxTemp){
                            maxTemp = weather[i];
                        }
                        if(weather[i] < minTemp){
                            minTemp = weather[i];
                        }
                    }

                    // check if the input mass is valid
                    if(mass === undefined || mass === null){
                        const data = {
                            error: 'Input mass must be a number greater than 0.'
                        }
                        res.json(data)
                        return
                    }

                    // calculations
                    const accel = engineForce / (planeMass + mass) // a = F / m
                    const toffTime = flightSpeed / accel // t = v / a
                    const toffPos = ( 0.5 * accel * toffTime * toffTime ) // x = 0.5  *a*  t^2
                    const maxMass = ((60 * engineForce) / flightSpeed) - planeMass // extra mass to take off in exactly 60 seconds
                    let massToRemove = mass - maxMass // mass that needs to be removed to take off in 60 seconds

                    if(massToRemove < 0) massToRemove = 0;

                    // insert generated data into the table
                    let insertData;
                    if(toffTime > 60){
                        insertData = {mass: mass, takeoff_time: toffTime, takeoff_position: toffPos, mass_to_remove: massToRemove};
                    }
                    else {
                        insertData = {mass: mass, takeoff_time: toffTime, takeoff_position: toffPos};
                    }
                    connection.query('INSERT INTO plane_data SET ?', insertData, (error, results) => {
                        if (error) throw error;
                    });

                    // return the result in a JSON format
                    const resultData = {
                        takeoffTime: toffTime,
                        takeoffPosition: toffPos,
                        massToRemove: massToRemove,
                        availableHours: availableHours,
                        minTemp: minTemp,
                        maxTemp: maxTemp
                    }
                    res.json(resultData)
                }
            })
            .catch(error => {
                console.log("SERVER: Error: " + error)
                res.end()
            });

    }

});

app.listen(port, () => {
    console.log(`Setup complete. Visit http://localhost:3000 to see the app!`)
});