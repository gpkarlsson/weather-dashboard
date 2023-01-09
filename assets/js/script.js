const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currWeatherItemsEl = document.getElementById('current-weather-items');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const daily = document.getElementById('future')
var today = dayjs().format('dddd, MMMM D, YYYY');
dateEl.textContent = today;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
  const minute = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM'
  timeEl.innerHTML = hoursIn12HrFormat + ':' + minute + '' + `<span id='am-pm'>${ampm}</span`

}, 1000);

getWeather();

function getWeather() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    //const apiKey = '';
    let { latitude, longitude } = success.coords;
    //let {API_Key} = apiKey;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=02de89be83267d4702049938b828e151&units=imperial`).then(res => res.json().then(data => {
      console.log(data);
      showWeatherData(data);
    }))

  })
}
getWeather();

function showWeatherData(data) {
  let { humidity } = data.list[0].main;
  let { pressure } = data.list[0].main;
  let { speed } = data.list[0].wind;
  currWeatherItemsEl.innerHTML =
    `<div class="weather-item">
  <div>Humidity</div>
  <div>${humidity}%</div>
</div>
<div class="weather-item">
  <div>Pressure</div>
  <div>${pressure}</div>
</div>
<div class="weather-item">
<div>Wind Speed</div>
<div>${speed} mph</div>
`;
console.log('test');
  let otherDayForecast = ''
  days.forEach((d, idx) => {
    if (idx == 0) {
    } else {
      otherDayForecast += `
      <div class="weather-forecast-item">
          <div class="day"></div>
          <img src="http://openweathermap.org/img/wn/${data.list[0].weather.icon}@2x.png" alt="weather icon" class="w-icon">
          <div class="temp">${data.list[0].main.temp_min}&#176; F</div>
          <div class="temp">${data.list[0].main.temp_max}&#176; F</div>
        </div>
      `
    }
  })

}

showWeatherData()