const apiKey = "07cf1f0a4c2e245e6623cb29b6c32b16";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityname").value;
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        weatherResult.innerHTML = "❗ Please enter a city name";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                weatherResult.innerHTML = " City not found";
                return;
            }

            weatherResult.innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p> Temperature: ${data.main.temp} °C</p>
                <p> Condition: ${data.weather[0].description}</p>
                <p> Humidity: ${data.main.humidity}%</p>
                <p> Wind Speed: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = " Error fetching weather data";
            console.error(error);
        });
});
