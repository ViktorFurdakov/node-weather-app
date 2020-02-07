const https = require('https');
const request = require('request');

const fetch = (config, callback) => request(config, (error, response) => {
  if (error || !response) {
    callback(null, error);
  } else {
    callback(response.body);
  }
});

/** STANDARD HTTP */
// const fetch = (config, callback) => {
//   const request = https.request(config.url, response => {
//     const data = [];
//     response.on('data', chunk => {
//       data.push(chunk.toString());
//     });
//     response.on('end', () => {
//       const body = JSON.parse(data.join(''));
//       callback(body);
//     });
//     response.on('error', error => {
//       // console.log(error);
//       callback(null, error);
//     });
//   });
//
//   request.end();
// };

module.exports = {
  fetch,
};

