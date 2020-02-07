const getForecast = address => fetch(`/weather?address=${address}`)
  .then(response => response.json()
    .then((data) => {
      if (data.error) {
        return { error: data.error };
      }
      return data;
    }));

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationEl = document.querySelector('#location');
const forecastEl = document.querySelector('#forecast');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();

  locationEl.textContent = 'Loading ...';
  forecastEl.textContent = '';

  getForecast(search.value)
    .then(data => {

      if (data.error) {
        locationEl.textContent = data.error;
      }
      locationEl.textContent = data.location;
      forecastEl.textContent = data.weather;
    });
});
