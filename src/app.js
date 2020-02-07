const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatesPath);
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'From hbs',
    name: 'Viktor',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Viktor',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'Help message',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'Address must be provided',
    });
  }

  const sendError = error => {
    res.send({
      error,
    });
  };

  const getForecast = (
    { features = [], message } = {},
    error = null,
  ) => {
    if (error || message) {
      return sendError('Cannot geocode');
    }
    const [location = {}] = features;
    const { center, place_name, matching_place_name } = location;
    forecast(center, (data = {}, error = null) => {
      if (error || !data.currently) {
        return sendError('Cannot get forecast');
      }
      res.send({
        location: matching_place_name|| place_name,
        weather: data.currently.temperature + ' degrees, ' + data.currently.precipProbability + ' chance of precipitation',
      });
    });
  };

  geocode(address, getForecast);
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help Article not found',
    title: 'Not Found',
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    message: '404 Not Found',
    title: 'Not Found',
  })
});

app.listen(3000, () => {
  console.log('Started!');
});
