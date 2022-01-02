const request = require('request');

const geoCode = (address, callBack) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY29zbWljZmVsbGEiLCJhIjoiY2t3amE5dGY4MWc4cTJvcXZza3VwN2FlciJ9.ZgadUPwxohKbM69GTrUSFQ&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callBack('Unable to connect to weather service', undefined);
        } else if (body.features.length === 0) {
            callBack('Unable to find location', undefined);
        } else {
            callBack(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;