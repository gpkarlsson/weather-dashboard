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
var local = document.getElementById('localstorage');

var inputCity = document.getElementById('inputCity');
var searchBtn = document.getElementById('searchBtn');
var searchValues = ['madison'];

//Saves to local storage
searchValues = JSON.parse(localStorage.getItem('inputCity')) || [];
var list = document.getElementById('list');
//Runs searchFunc function on click
searchBtn.addEventListener('click', searchFunc);

//Pushes inputCity value to searchValues array 
function searchFunc() {
  console.log('here is searchValues', searchValues);
  console.log('here is inputCity', inputCity);
  searchValues.push(inputCity);
  localStorage.setItem('inputCity', JSON.stringify(searchValues.value));
  appendToPage();
}

//appends search results to unordere list on page
function appendToPage() {
  for (i = 0; i < searchValues.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = searchValues[i];
    listItem.addEventListener('click', searchFunc);
    list.appendChild(listItem);
  }
}

//Days and months
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// dayjs.extend(window.dayjs_plugin_utc);
// dayjs.extend(window.dayjs_plugin_timezone)

// Checks the time every second to update it properly
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
  timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minute < 10 ? '0' + minute : minute) + ' ' + `<span id='am-pm'>${ampm}</span>`
  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);


getWeather();

//gets location from browser and displays weather
function getWeather() {
  navigator.geolocation.getCurrentPosition((success) => {
    //const apiKey = '';
    let { latitude, longitude } = success.coords;
    //api call
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=02de89be83267d4702049938b828e151&units=imperial`).then(res => res.json().then(data => {
      showWeatherData(data);
    }))

  })
}
getWeather();

function showWeatherData(data) {

  //Creates objects for humidity, pressure and wind speed from api call values
  let { humidity } = data.list[0].main;
  let { pressure } = data.list[0].main;
  let { speed } = data.list[0].wind;
  currWeatherItemsEl.innerHTML =
    //creates html with objects passed in 
    `<div class='weather-item'>
  <div>Humidity</div>
  <div>${humidity}%</div>
</div>
<div class='weather-item'>
  <div>Pressure</div>
  <div>${pressure}</div>
</div>
<div class='weather-item'>
<div>Wind Speed</div>
<div>${speed} mph</div>
`;
  let otherDayForecast = ''
  days.forEach((days, idx) => {
    if (idx == 0) {
      currentTempEl.innerHTML = `
      <img src='https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png' alt='weather icon' class='w-icon'>
      <div class='other'>
        <div class='day'>${window.moment(days.dt * 1000).format('ddd')}</div>
        <div class='temp'>${data.list[0].main.temp_min}&#176; F</div>
        <div class='temp'>${data.list[0].main.temp_max}&#176; F</div>
      </div>
      `
    } else {
      otherDayForecast += `
      <div class='weather-forecast-item'>
          <div class='day'>${window.moment(days.dt * 1000).format('ddd')}</div>
          <img src='https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png' alt='weather icon' class='w-icon'>
          <div class='temp'>${data.list[8].main.temp_min}&#176; F</div>
          <div class='temp'>${data.list[8].main.temp_max}&#176; F</div>
        </div>
      `
      weatherForecastEl.innerHTML = otherDayForecast;
    }
  })

}

//gets coordinates from searched city name
function getCoordinates() {

  let { cityName } = searchValues;
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=02de89be83267d4702049938b828e151`)
    .then((response) => response.json())
    .then((data) => console.log(data))

}


//gets current weather for coordinates searched
function getCurrentWeather() {

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`)
    .then((response) => response.json())
    .then((data) => console.log(data))

}
