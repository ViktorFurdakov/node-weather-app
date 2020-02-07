const http = require('./http');

/**
 * @param { Number[] } location
 * @param { Function } callback
 */
const forecast = (location, callback) => {
  const [longitude, latitude] = location;
  const url = `https://api.darksky.net/forecast/4d17a917f8dd526c135bd234c7aa77ca/${latitude},${longitude}?units=si`;
  http.fetch({url, json: true}, callback);
};

module.exports = forecast;
