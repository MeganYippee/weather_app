// Date & Time
let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
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
today.innerHTML = `Today is ${day}, ${month} ${date}, ${year} at ${hour}:${minute}`;

// City Info
function city(event) {
  event.preventDefault();

  let cityName = document.querySelector(".city");
  let searchInput = document.querySelector("#city-search-input");
  cityName.innerHTML = `${searchInput.value}`;
  //Weather Info
  function weatherInfo(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let realTemp = document.querySelector("#temperature");

    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let conditionElement = document.querySelector("#condition");

    humidityElement.innerHTML = `${response.data.main.humidity}%`;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    conditionElement.innerHTML = `${response.data.weather[0].description}`;
    realTemp.innerHTML = `${temp}`;
  }
  let apiKey = "c87f4cfeec08e60e3fffae2d5c8fb202";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherInfo);
}
let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", city);

// Degree Units
function convertCel(event) {
  event.preventDefault();
  let celElement = document.querySelector("#temperature");
  celElement.innerHTML = 25;
}
function convertFah(event) {
  event.preventDefault();
  let fahElement = document.querySelector("#temperature");
  fahElement.innerHTML = 77;
}
let celciusLink = document.querySelector("#celcius");
let fahrenheitLink = document.querySelector("#fahrenheit");
celciusLink.addEventListener("click", convertCel);
fahrenheitLink.addEventListener("click", convertFah);

// Current Location Button
function getCoords() {
  navigator.geolocation.getCurrentPosition(thisPosition);
}
function thisPosition(position) {
  let apiKey2 = "c87f4cfeec08e60e3fffae2d5c8fb202";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey2}&units=imperial`;
  axios.get(geoPositionUrl).then(currentPosition);
}
function currentPosition(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let currentPlace = document.querySelector("#city");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentCondition = document.querySelector("#condition");
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentCondition.innerHTML = `${response.data.weather[0].description}`;
  currentPlace.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${currentTemperature}`;
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCoords);
