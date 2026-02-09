 
const apiKey = "YOUR_API_KEY";

 
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const sampleCitiesBtn = document.getElementById("sampleCitiesBtn");
const closeModal = document.getElementById("closeModal");
const sampleModal = document.getElementById("sampleModal");
const cityBtns = document.querySelectorAll(".city-btn");
 
const cityElement = document.getElementById("city");
const conditionElement = document.getElementById("condition");
const tempElement = document.getElementById("temp");
const feelsElement = document.getElementById("feels");
const tempMinElement = document.getElementById("tempMin");
const tempMaxElement = document.getElementById("tempMax");
const statusElement = document.getElementById("status");
const statusCard = document.getElementById("statusCard");
const windSpeedElement = document.getElementById("windSpeed");
const humidityElement = document.getElementById("humidity");
const pressureElement = document.getElementById("pressure");
const visibilityElement = document.getElementById("visibility");
const sunriseElement = document.getElementById("sunrise");
const sunsetElement = document.getElementById("sunset");
const dateTimeElement = document.getElementById("dateTime");
const lastUpdateElement = document.getElementById("lastUpdate");
const weatherIcon = document.getElementById("weatherIcon");
 
const rainEffect = document.getElementById("rain");
const snowEffect = document.getElementById("snow");
const windEffect = document.getElementById("wind");
const lightningEffect = document.getElementById("lightning");
 
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim()) {
    fetchWeather(cityInput.value.trim());
  } else {
    showAlert("Please enter a city name");
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

currentLocationBtn.addEventListener("click", getCurrentLocationWeather);

sampleCitiesBtn.addEventListener("click", () => {
  sampleModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  sampleModal.style.display = "none";
});

cityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("data-city");
    fetchWeather(city);
    sampleModal.style.display = "none";
    cityInput.value = city;
  });
});
 
window.addEventListener("click", (e) => {
  if (e.target === sampleModal) {
    sampleModal.style.display = "none";
  }
});
 s
function formatTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString("en-US", options);
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  dateTimeElement.textContent = `${dateString} • ${timeString}`;
  lastUpdateElement.textContent = `Just now (${timeString})`;
}

function showAlert(message) {
  alert(message);
}

function showLoading(isLoading) {
  if (isLoading) {
    document.querySelector(".container").classList.add("loading");
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    searchBtn.disabled = true;
  } else {
    document.querySelector(".container").classList.remove("loading");
    searchBtn.innerHTML =
      '<i class="fas fa-location-arrow"></i><span>Get Weather</span>';
    searchBtn.disabled = false;
  }
}
 
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    showLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.cod === 200) {
              processWeatherData(data);
              showLoading(false);
            } else {
              throw new Error("Location not found");
            }
          })
          .catch(() => {
            showAlert("Unable to get weather for your location");
            showLoading(false);
          });
      },
      () => {
        showAlert("Unable to access your location. Please enable location services.");
        showLoading(false);
      }
    );
  } else {
    showAlert("Geolocation is not supported by your browser");
  }
}
 
function processWeatherData(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);
  const condition = data.weather[0].main;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const wind = data.wind.speed.toFixed(1);
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const visibility = (data.visibility / 1000).toFixed(1);
  const sunriseTime = formatTime(data.sys.sunrise);
  const sunsetTime = formatTime(data.sys.sunset);
 
  let status = "normal";
  let statusText = "Conditions are pleasant";

  if (data.wind.speed > 15) {
    status = "storm";
    statusText = "Stormy weather - stay safe!";
  } else if (data.main.temp > 35) {
    status = "hot";
    statusText = "Hot weather - stay hydrated!";
  } else if (data.main.temp < 5) {
    status = "cold";
    statusText = "Cold weather - bundle up!";
  } else if (data.weather[0].main.includes("Rain")) {
    status = "rain";
    statusText = "Rainy weather - carry an umbrella!";
  } else if (data.weather[0].main.includes("Snow")) {
    status = "snow";
    statusText = "Snowy weather - drive carefully!";
  }


  updateUI({
    name: cityName,
    country,
    temp,
    feels_like: feelsLike,
    temp_min: tempMin,
    temp_max: tempMax,
    description,
    icon: iconCode,
    wind,
    humidity,
    pressure,
    visibility,
    sunrise: sunriseTime,
    sunset: sunsetTime,
    status,
    statusText,
    condition,
  });


  updateDateTime();

  updateBackground(condition, temp);


  updateWeatherEffects(condition, data.wind.speed);
}


function updateUI(data) {
  cityElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.country}`;
  conditionElement.textContent = data.description;
  tempElement.textContent = data.temp;
  feelsElement.textContent = data.feels_like;
  tempMinElement.textContent = data.temp_min;
  tempMaxElement.textContent = data.temp_max;
  statusElement.textContent = data.statusText;
  windSpeedElement.textContent = data.wind;
  humidityElement.textContent = data.humidity;
  pressureElement.textContent = data.pressure;
  visibilityElement.textContent = data.visibility;
  sunriseElement.textContent = data.sunrise;
  sunsetElement.textContent = data.sunset;


  weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  weatherIcon.alt = data.condition;


  statusCard.className = `status-card ${data.status}`;
  statusCard.querySelector("i").className = getStatusIcon(data.status);
}


function getStatusIcon(status) {
  switch (status) {
    case "hot":
      return "fas fa-temperature-high";
    case "cold":
      return "fas fa-temperature-low";
    case "storm":
      return "fas fa-poo-storm";
    case "rain":
      return "fas fa-cloud-rain";
    case "snow":
      return "fas fa-snowflake";
    default:
      return "fas fa-info-circle";
  }
}

function updateBackground(condition, temp) {
  // Remove all weather classes
  document.body.classList.remove(
    "clear",
    "clouds",
    "rain",
    "snow",
    "storm",
    "hot",
    "cold",
    "mist"
  );


  if (condition.includes("Clear")) {
    document.body.classList.add("clear");
  } else if (condition.includes("Cloud")) {
    document.body.classList.add("clouds");
  } else if (condition.includes("Rain") || condition.includes("Drizzle")) {
    document.body.classList.add("rain");
  } else if (condition.includes("Snow")) {
    document.body.classList.add("snow");
  } else if (condition.includes("Thunderstorm")) {
    document.body.classList.add("storm");
  } else if (
    condition.includes("Mist") ||
    condition.includes("Fog") ||
    condition.includes("Haze")
  ) {
    document.body.classList.add("mist");
  }

  if (temp > 30) {
    document.body.classList.add("hot");
  } else if (temp < 10) {
    document.body.classList.add("cold");
  }
}


function updateWeatherEffects(condition, windSpeed) {
  // Clear all effects first
  rainEffect.style.display = "none";
  snowEffect.style.display = "none";
  windEffect.style.display = "none";
  lightningEffect.style.display = "none";


  if (condition.includes("Rain") || condition.includes("Drizzle")) {
    createRainEffect();
  }

  if (condition.includes("Snow")) {
    createSnowEffect();
  }

  if (windSpeed > 8) {
    createWindEffect();
  }

  if (condition.includes("Thunderstorm")) {
    createLightningEffect();
  }
}


function createRainEffect() {
  rainEffect.style.display = "block";
  rainEffect.innerHTML = "";

  for (let i = 0; i < 40; i++) {
    const drop = document.createElement("div");
    drop.style.cssText = `
      position: absolute;
      width: 2px;
      height: ${15 + Math.random() * 15}px;
      background: linear-gradient(transparent, #4ca1af);
      border-radius: 0 0 5px 5px;
      left: ${Math.random() * 100}%;
      top: -20px;
      animation: rain 1s linear infinite;
      animation-delay: ${Math.random() * 1}s;
      opacity: ${0.3 + Math.random() * 0.7};
    `;
    rainEffect.appendChild(drop);
  }
}

function createSnowEffect() {
  snowEffect.style.display = "block";
  snowEffect.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const flake = document.createElement("div");
    flake.style.cssText = `
      position: absolute;
      width: ${5 + Math.random() * 5}px;
      height: ${5 + Math.random() * 5}px;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: -10px;
      animation: snow 5s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      opacity: ${0.5 + Math.random() * 0.5};
      box-shadow: 0 0 5px white;
    `;
    snowEffect.appendChild(flake);
  }
}


function createWindEffect() {
  windEffect.style.display = "block";
  windEffect.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const line = document.createElement("div");
    line.style.cssText = `
      position: absolute;
      width: ${20 + Math.random() * 30}px;
      height: 1px;
      background: rgba(255, 255, 255, 0.7);
      left: ${Math.random() * 100}%;
      top: ${20 + Math.random() * 100}px;
      animation: wind 2s linear infinite;
      animation-delay: ${Math.random() * 2}s;
      opacity: ${0.2 + Math.random() * 0.3};
    `;
    windEffect.appendChild(line);
  }
}

// Create lightning effect
function createLightningEffect() {
  lightningEffect.style.display = "block";
  lightningEffect.innerHTML = "";

  const flash = document.createElement("div");
  flash.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0;
    animation: lightning 4s infinite;
    pointer-events: none;
  `;
  lightningEffect.appendChild(flash);
}

// Main fetch weather function
async function fetchWeather(cityName) {
  try {
    showLoading(true);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();
    if (data.cod !== 200) throw "City not found";

    processWeatherData(data);
    showLoading(false);
  } catch {
    showAlert("City not found!");
    showLoading(false);
  }
}

// Initialize with default city
fetchWeather("London");