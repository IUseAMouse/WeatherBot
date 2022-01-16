'use strict';

const API_KEY = "239d2804c99aa098974ea74728edaf79";

const request = require('request');
const Readline = require('readline'); // for reading inputs
const matcher = require('./matcher');
const weather = require ('./weather');
const { Console } = require('console');


const rl = Readline.createInterface ({ // for reading inputs
    input : process.stdin,
    output : process.stdout,
    terminal : false
});
const routes = {
    'Welcome': "Hi ! Enter city :",
    'Default': "I don't understand, please repeat",
    'Bye': "Farewell"
};

rl.setPrompt('>>');
rl.prompt();
rl.on('line', reply => {
    matcher(reply, (data) => {
        const intent = data.intent;
        if(intent == 'Hello'){
            console.log('Hello there !');
        }
        if(intent == 'Exit'){           
            process.exit(console.log('See you soon'));
        }
        if(intent == 'get weather'){
            try{
                const city = data.entities.groups.city;
                const time = data.entities.groups.time;
                var query = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY
                request(query, function (error, response, body) {
         
                    if (!error && response.statusCode == 200) {
             
                        console.log("Looking for " + city + " weather " + time + "...");
                        const res = JSON.parse(body)
        
                        var temp = Math.round((parseInt(
                            res.main.temp_min) - 273.15), 2)
            
                        var pressure = Math.round(parseInt(
                                res.main.pressure) - 1013.15)
            
                        var rise = new Date(parseInt(
                                res.sys.sunrise) * 1000);
            
                        var set = new Date(parseInt(
                                res.sys.sunset) * 1000);
             
                        console.log(res.name + ' ****\nTemperature: '
                                + String(temp) + '°C\nHumidity: ' +
                                res.main.humidity + ' %\nWeather: '
                                + res.weather[0].description +
                                '\nPressure: ' + String(pressure)
                                + ' atm\nSunrise: ' +
                                rise.toLocaleTimeString() +
                                ' \nSunset: ' +
                                set.toLocaleTimeString() +
                                '\nCountry: ' + res.sys.country)
                    }
                })
            }
            catch(error){
                console.log(error)
            }
        }
        else if(intent == 'default'){
            console.log(routes.Default);
        }
    });

    rl.prompt();
});



rl.on('line', reply => {
    try{
        var query = 'http://api.openweathermap.org/data/2.5/weather?q=' + reply + '&appid=' + API_KEY
        request(query, function (error, response, body) {
 
            if (!error && response.statusCode == 200) {
     
                console.log("Looking for " + reply + " weather ...")
                const res = JSON.parse(body)

                var temp = Math.round((parseInt(
                    res.main.temp_min) - 273.15), 2)
    
                var pressure = Math.round(parseInt(
                        res.main.pressure) - 1013.15)
    
                var rise = new Date(parseInt(
                        res.sys.sunrise) * 1000);
    
                var set = new Date(parseInt(
                        res.sys.sunset) * 1000);
     
                console.log(res.name + ' ****\nTemperature: '
                        + String(temp) + '°C\nHumidity: ' +
                        res.main.humidity + ' %\nWeather: '
                        + res.weather[0].description +
                        '\nPressure: ' + String(pressure)
                        + ' atm\nSunrise: ' +
                        rise.toLocaleTimeString() +
                        ' \nSunset: ' +
                        set.toLocaleTimeString() +
                        '\nCountry: ' + res.sys.country)
            }
        })
    }
    catch(error){
        console.log(error)
    }

    rl.prompt ();
}) ;

