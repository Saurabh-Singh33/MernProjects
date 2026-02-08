const apiKey = "07cf1f0a4c2e245e6623cb29b6c32b16";

 

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const condition = document.getElementById("condition");
const temp = document.getElementById("temp");
const feels = document.getElementById("feels");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const icon = document.getElementById("weatherIcon");
const status = document.getElementById("status");

function formatTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function fetchWeather(cityName) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();
    if (data.cod !== 200) throw "City not found";

    city.textContent = `${data.name}, ${data.sys.country}`;
    condition.textContent = data.weather[0].description;
    temp.textContent = Math.round(data.main.temp);
    feels.textContent = Math.round(data.main.feels_like);
    windSpeed.textContent = data.wind.speed;
    humidity.textContent = data.main.humidity;
    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    if (data.wind.speed > 15) {
      status.textContent = "Status: Stormy Weather";
      status.className = "status storm";
    } else if (data.main.temp > 35) {
      status.textContent = "Status: Hot Weather";
      status.className = "status hot";
    } else if (data.main.temp < 10) {
      status.textContent = "Status: Cold Weather";
      status.className = "status cold";
    } else {
      status.textContent = "Status: Normal Weather";
      status.className = "status normal";
    }

  } catch {
    alert("City not found!");
  }
}

searchBtn.onclick = () => {
  if (cityInput.value.trim()) {
    fetchWeather(cityInput.value.trim());
  }
};

cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

fetchWeather("London");
