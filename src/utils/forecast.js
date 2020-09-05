const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0e07beeb8e03c74673c82dc06a705cad&query= ' + latitude + ',' + longitude + ' ';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback(chalk.red('Unable to connect to weather service'), undefined);
        }else if(response.body.error){
            callback(chalk.red('Unable to find location'), undefined);
        }else{
            callback(undefined, {
                forecast: response.body.current.weather_descriptions[0],
                icon: response.body.current.weather_icons[0],
                temperature: response.body.current.temperature,
            });
        }
    });
}

module.exports = forecast;