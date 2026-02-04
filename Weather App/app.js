const apiKey = "07cf1f0a4c2e245e6623cb29b6c32b16";

// Get all elements
const weatherResult = document.getElementById("weatherResult");
const button = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityname");

// Weather state tracking
let currentWeatherData = null;

// Function to get wind speed description
function getWindDescription(speed) {
    if (speed < 1) return "Calm";
    if (speed < 5) return "Light Breeze";
    if (speed < 11) return "Gentle Breeze";
    if (speed < 20) return "Moderate Wind";
    if (speed < 32) return "Strong Wind";
    if (speed < 41) return "Gale";
    return "Hurricane Force";
}

// Function to get humidity description
function getHumidityDescription(humidity) {
    if (humidity < 30) return "Dry";
    if (humidity < 60) return "Moderate";
    if (humidity < 80) return "Humid";
    return "Very Humid";
}

// (pressure & visibility helpers removed to shorten code)

// Function to format time from Unix timestamp
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Function to clear all animations
function clearAnimations() {
    const rainContainer = document.getElementById("rainContainer");
    const windContainer = document.getElementById("windContainer");
    const snowContainer = document.getElementById("snowContainer");
    const weatherEffects = document.getElementById("weatherEffects");
    const lightningEffect = document.getElementById("lightningEffect");

    if (rainContainer) {
        rainContainer.innerHTML = "";
        rainContainer.classList.remove("active", "rain-light", "rain-medium", "rain-heavy");
    }
    if (windContainer) {
        windContainer.innerHTML = "";
        windContainer.classList.remove("active", "wind-slow", "wind-medium", "wind-fast");
    }
    if (snowContainer) {
        snowContainer.innerHTML = "";
        snowContainer.classList.remove("active", "snow-light", "snow-medium", "snow-heavy");
    }
    if (lightningEffect) lightningEffect.classList.remove("active");
    if (weatherEffects) weatherEffects.classList.remove("clear", "rainy", "snowy", "stormy", "cloudy");
}

// Function to create rain animation
function createRainAnimation(intensity) {
    const rainContainer = document.getElementById("rainContainer");
    rainContainer.classList.add("active");
    
    const rainCount = intensity === "light" ? 15 : intensity === "medium" ? 25 : 40;
    rainContainer.classList.add(`rain-${intensity}`);
    
    for (let i = 0; i < rainCount; i++) {
        const raindrop = document.createElement("div");
        raindrop.className = "raindrop";
        raindrop.style.left = Math.random() * 100 + "%";
        raindrop.style.animationDelay = Math.random() * 0.5 + "s";
        rainContainer.appendChild(raindrop);
    }
    
    document.getElementById("weatherEffects").classList.add("rainy");
}

// Function to create wind animation
function createWindAnimation(speed) {
    const windContainer = document.getElementById("windContainer");
    windContainer.classList.add("active");
    
    let windIntensity;
    if (speed < 10) windIntensity = "slow";
    else if (speed < 20) windIntensity = "medium";
    else windIntensity = "fast";
    
    windContainer.classList.add(`wind-${windIntensity}`);
    
    const windCount = windIntensity === "slow" ? 3 : windIntensity === "medium" ? 5 : 7;
    
    for (let i = 0; i < windCount; i++) {
        const windLine = document.createElement("div");
        windLine.className = "wind-line";
        windLine.style.animationDelay = Math.random() * 1 + "s";
        windContainer.appendChild(windLine);
    }
}

// Function to create snow animation
function createSnowAnimation(intensity) {
    const snowContainer = document.getElementById("snowContainer");
    snowContainer.classList.add("active");
    
    const snowCount = intensity === "light" ? 9 : intensity === "medium" ? 15 : 20;
    snowContainer.classList.add(`snow-${intensity}`);
    
    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.style.animationDelay = Math.random() * 1.5 + "s";
        snowContainer.appendChild(snowflake);
    }
    
    document.getElementById("weatherEffects").classList.add("snowy");
}

// Function to fetch weather
function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                weatherResult.innerHTML = "<p style='color: red; font-weight: bold; padding: 20px; text-align: center;'> City not found. Please try another city.</p>";
                document.body.className = "";
                return;
            }

            currentWeatherData = data;
            clearAnimations();

            const temp = Math.round(data.main.temp);
            const wind = parseFloat(data.wind.speed.toFixed(2));
            const condition = data.weather[0].description;
            const humidity = data.main.humidity;
            const feelsLike = Math.round(data.main.feels_like);
            const clouds = data.clouds.all;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            const weatherMain = data.weather[0].main.toLowerCase();
            const sunrise = formatTime(data.sys.sunrise).replace(/t/g, '').trim();
            const sunset = formatTime(data.sys.sunset).replace(/t/g, '').trim();

            let statusText = "Normal Weather ";
            let weatherStatus = "normal";
            let bgWeatherClass = "";

            // Determine weather conditions and apply animations
            if (weatherMain.includes("rain")) {
                if (temp < 0 || condition.includes("sleet")) {
                    createSnowAnimation("medium");
                    statusText = " Rainy & Cold Weather";
                    weatherStatus = "cold";
                    bgWeatherClass = "snowy-weather";
                } else {
                    const rainIntensity = condition.includes("heavy") ? "heavy" : condition.includes("light") ? "light" : "medium";
                    createRainAnimation(rainIntensity);
                    statusText = ` ${rainIntensity.charAt(0).toUpperCase() + rainIntensity.slice(1)} Rain`;
                    weatherStatus = "cold";
                    bgWeatherClass = "rainy-weather";
                }
            } else if (weatherMain.includes("snow")) {
                const snowIntensity = condition.includes("heavy") ? "heavy" : condition.includes("light") ? "light" : "medium";
                createSnowAnimation(snowIntensity);
                statusText = " Snowing";
                weatherStatus = "cold";
                bgWeatherClass = "snowy-weather";
            } else if (weatherMain.includes("cloud")) {
                document.getElementById("weatherEffects").classList.add("cloudy");
                statusText = " Cloudy";
            } else if (weatherMain.includes("clear") || weatherMain.includes("sunny")) {
                document.getElementById("weatherEffects").classList.add("clear");
                statusText = " Clear & Sunny";
                bgWeatherClass = "clear-weather";
            }

            // Temperature-based status (can override)
            if (temp < 0) {
                statusText = " Freezing Cold";
                weatherStatus = "cold";
                bgWeatherClass = "snowy-weather";
            } else if (temp < 10) {
                if (!weatherMain.includes("rain") && !weatherMain.includes("snow")) {
                    statusText = "❄ Very Cold Weather";
                }
                weatherStatus = "cold";
                if (!bgWeatherClass) bgWeatherClass = "snowy-weather";
            } else if (temp > 35) {
                statusText = " Very Hot Weather";
                weatherStatus = "hot";
                bgWeatherClass = "clear-weather";
            }

            // Wind-based status (highest priority for storms)
            if (wind > 20) {
                createWindAnimation(wind);
                document.getElementById("weatherEffects").classList.add("stormy");
                document.getElementById("lightningEffect").classList.add("active");
                statusText = " Storm / Very Fast Wind";
                weatherStatus = "storm";
                bgWeatherClass = "stormy-weather";
            } else if (wind > 10) {
                createWindAnimation(wind);
                if (!statusText.includes("")) {
                    statusText = " Fast Wind";
                }
                weatherStatus = "windy";
            }

            // Update body background
            document.body.className = bgWeatherClass;

            // Update HTML with all data
            weatherResult.innerHTML = `
                <div class="weather-effects" id="weatherEffects">
                    <div class="effect-container">
                        <img id="weatherIcon" src="${iconUrl}" width="120" alt="Weather Icon">
                    </div>
                    <div class="rain-container" id="rainContainer"></div>
                    <div class="wind-container" id="windContainer"></div>
                    <div class="snow-container" id="snowContainer"></div>
                    <div class="lightning-effect" id="lightningEffect"></div>
                </div>

                <div class="city-info">
                    <h2 id="cityName">${data.name}, ${data.sys.country}</h2>
                    <p class="condition" id="conditionText">${condition}</p>
                </div>

                <div class="temperature-display">
                    <div class="main-temp">
                        <span id="mainTemp">${temp}</span>
                        <span class="degree">C</span>
                    </div>
                    <div class="feels-like">
                        Feels like <span id="feelsTemp">${feelsLike}</span>C
                    </div>
                </div>

                <p class="status ${weatherStatus}" id="statusBadge">Status: ${statusText}</p>

                <div class="params-container">
                    <div class="param-card">
                        <div class="param-icon"></div>
                        <div class="param-content">
                            <span class="param-label">Wind Speed</span>
                            <span class="param-value" id="windValue">${wind} m/s</span>
                            <span class="param-detail" id="windDetail">${getWindDescription(wind)}</span>
                        </div>
                    </div>

                    <div class="param-card">
                        <div class="param-icon"></div>
                        <div class="param-content">
                            <span class="param-label">Humidity</span>
                            <span class="param-value" id="humidityValue">${humidity}%</span>
                            <span class="param-detail" id="humidityDetail">${getHumidityDescription(humidity)}</span>
                        </div>
                    </div>
                </div>

                <div class="details-section">
                    <div class="detail-item">
                        <span class="detail-label">Condition</span>
                        <span class="detail-value" id="detailCondition">${condition.charAt(0).toUpperCase() + condition.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Sunrise</span>
                        <span class="detail-value" id="sunrise">${sunrise}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Sunset</span>
                        <span class="detail-value" id="sunset">${sunset}</span>
                    </div>
                </div>
            `;

            // Reapply animations after HTML update
            if (weatherMain.includes("rain")) {
                if (temp < 0 || condition.includes("sleet")) {
                    createSnowAnimation("medium");
                } else {
                    const rainIntensity = condition.includes("heavy") ? "heavy" : condition.includes("light") ? "light" : "medium";
                    createRainAnimation(rainIntensity);
                }
            } else if (weatherMain.includes("snow")) {
                const snowIntensity = condition.includes("heavy") ? "heavy" : condition.includes("light") ? "light" : "medium";
                createSnowAnimation(snowIntensity);
            }

            if (wind > 20) {
                createWindAnimation(wind);
                document.getElementById("weatherEffects").classList.add("stormy");
                document.getElementById("lightningEffect").classList.add("active");
            } else if (wind > 10) {
                createWindAnimation(wind);
            }

            if (weatherMain.includes("cloud")) {
                document.getElementById("weatherEffects").classList.add("cloudy");
            } else if (weatherMain.includes("clear") || weatherMain.includes("sunny")) {
                document.getElementById("weatherEffects").classList.add("clear");
            }
        })
        .catch(() => {
            weatherResult.innerHTML = "<p style='color: red; font-weight: bold; padding: 20px; text-align: center;'> Error fetching data. Please check your internet connection.</p>";
            document.body.className = "";
        });
}

// Event listeners
button.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    }
});

// Allow Enter key to search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city !== "") {
            fetchWeather(city);
        }
    }
});

// Default city on load
fetchWeather("London");
