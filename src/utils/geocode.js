const http = require('./http');

const token = 'pk.eyJ1IjoiZnVyZGFrb3YiLCJhIjoiY2s1ZHFreWxoMDZqODN2bWtwbmVzbWF3biJ9.v-nXoIZ9TlIlg3qkslWWiQ';

/**
 * @param { string } address
 * @param { Function } callback
 */
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
  http.fetch({url, json: true}, callback);
};

module.exports = geocode;
