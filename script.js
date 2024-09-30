const apiKey = 'YOUR_API_KEY';  // Replace this with your OpenWeatherMap API key

// DOM Elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherConditionElement = document.getElementById('weather-condition');
const humidityElement = document.getElementById('humidity');
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Fetch weather data by city name
function getWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('City not found. Please try again.'));
}

// Fetch weather data by geographic coordinates
function getWeatherByLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Unable to fetch weather. Please try again.'));
}

// Display weather data on the page
function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];

    locationElement.textContent = name;
    temperatureElement.textContent = Math.round(temp);
    weatherConditionElement.textContent = description;
    humidityElement.textContent = humidity;
}

// Use the browser's geolocation API to get the user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                getWeatherByLocation(latitude, longitude);
            },
            () => alert('Unable to retrieve location. Please enter city manually.')
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Automatically get weather data based on user's location when the page loads
window.onload = getUserLocation;
