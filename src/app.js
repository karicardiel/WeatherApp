function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/50d@2x.png"
        alt=""
        width="36"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forcast high">20°</span>/
        <span class="weather-forecast-low">18°</span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let weatherStatutsElement = document.querySelector("#weatherStatus");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  weatherStatutsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);
}

function search(city) {
  let apiKey = "1f83f0ba3b574331625068275d764760";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Miami");

displayForecast();
