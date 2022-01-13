"use strict ";

const axios = require (" axios ") ;
const apikey = "239d2804c99aa098974ea74728edaf79"; 

const getWeather = location => {
    return new Promise ( async ( resolve , reject ) => {
    try {
        const weatherConditions = await axios .get("http://api.openweathermap.org/data/2.5/weather?q=",
        {
            params : {
            key: apikey ,
            q: location ,
            days : 3
            }
        }) ;
    
    resolve ( weatherConditions . data ) // returns back the results to the chatbot
    }
    catch ( error ) {
    reject ( error ) ;
    }
    }) ;
    }
    module . exports = getWeather ;