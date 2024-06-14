document.getElementById('fetch-weather-btn').addEventListener('click', fetchWeatherByLocationInput);
document.getElementById('fetch-weather-location-btn').addEventListener('click', fetchWeatherByCurrentLocation);

const apiKey = '0bef730d23e640ac91b160152241306'; // Your actual WeatherAPI key
const weatherInfoDiv = document.getElementById('weather-info');

function fetchWeatherByLocationInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeather(location);
    }
}

function fetchWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log data for debugging
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log data for debugging
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

function displayWeather(data) {
    if (data && data.current) {
        document.getElementById('location-name').textContent = data.location.name;
        document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c} °C`;
        document.getElementById('weather-condition').textContent = `Condition: ${data.current.condition.text}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity} %`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} kph`;
    } else {
        weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
}