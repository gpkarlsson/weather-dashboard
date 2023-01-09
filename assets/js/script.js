const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currWeatherItemsEl = document.getElementById('current-weather-items');
const timeZoneEl = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

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
    let {latitude, longitude } = success.coords;
    //let {API_Key} = apiKey;
    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=02de89be83267d4702049938b828e151&units=imperial`).then(res => res.json().then(data => {
      console.log(data);
      showWeatherData(data);

    }))

  })
}

function showWeatherData (data) {
  
}