// Date & Time
let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();

let today = document.querySelector("#today-is");
today.innerHTML = `Today is ${day}, ${month} ${date}, ${year} at ${hour}:${minutes}`;

getCoords();

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;

    return `${hour}:${minutes}`;
  }
}

// Forecast Info
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="col-3">
              <h5>
                ${formatHours(forecast.dt * 1000)}
                <br />
                ${Math.round(forecast.main.temp)} °F
                <br />
                <img
                    src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                    >
              </h5>
            </div>`;
  }
}

//Weather Info
function weatherInfo(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let realTemp = document.querySelector("#temperature");

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let conditionElement = document.querySelector("#condition");
  let iconElement = document.querySelector("#icon");

  fahrenheitResponse = response.data.main.temp;

  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  conditionElement.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  realTemp.innerHTML = `${temp}`;
}

// City Info
function city(event) {
  event.preventDefault();
  let cityName = document.querySelector(".city");
  let searchInput = document.querySelector("#city-search-input");
  cityName.innerHTML = `${searchInput.value}`;
  let apiKey = "c87f4cfeec08e60e3fffae2d5c8fb202";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=Imperial`;
  axios.get(apiUrl).then(weatherInfo);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=Imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", city);

// Current Location Button
function getCoords() {
  navigator.geolocation.getCurrentPosition(thisPosition);
}
function thisPosition(position) {
  let apiKey2 = "c87f4cfeec08e60e3fffae2d5c8fb202";
  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=${units}`;
  axios.get(geoPositionUrl).then(currentPosition);
}

function currentPosition(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let currentPlace = document.querySelector("#city");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentCondition = document.querySelector("#condition");
  let currentIcon = document.querySelector("#icon");

  fahrenheitResponse = response.data.main.temp;

  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentCondition.innerHTML = `${response.data.weather[0].description}`;
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentPlace.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${currentTemperature}`;

  let apiKey = "c87f4cfeec08e60e3fffae2d5c8fb202";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCoords);

// Temperature Unit Conversion

// Celcius
function celciusConversion(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celciusTemp = ((fahrenheitResponse - 32) * 5) / 9;
  let celciusActual = document.querySelector("#temperature");
  celciusActual.innerHTML = Math.round(celciusTemp);
}
// Temp Conversion back to fahreneheit
function fahrenheitConversion(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
  let fahrenheitActual = document.querySelector("#temperature");
  fahrenheitActual.innerHTML = Math.round(fahrenheitResponse);
}
let fahrenheitResponse = null;

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", celciusConversion);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);
