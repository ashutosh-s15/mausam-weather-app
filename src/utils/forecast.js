const request = require('request')

const forecast = (lat, long, callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=62864fa57263cde4961fe1278f804d2a&query=' + lat + ',' + long + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Unable to connect to internet service', undefined);
        } else if (body.error) {
            callBack('Unable to find location, try another search', undefined);
        } else {
            callBack(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                iconUrl: body.current.weather_icons
            })
        }
    })
};

module.exports = forecast;