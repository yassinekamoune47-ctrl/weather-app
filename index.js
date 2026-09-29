// Your OpenWeatherMap API key
const API_KEY = '6e48804f6f7c93352516c23d0738fef3';


// Get elements from HTML
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');


// Display weather information
function renderWeather(city, data) {

    cityName.textContent = city;

    weatherIcon.textContent = data.icon;

    temperature.textContent = data.temp;

    description.textContent = data.desc;

    humidity.textContent = data.humidity;

    wind.textContent = data.wind;
}


// Get weather icon
function getWeatherIcon(weather) {

    switch (weather) {

        case 'Clear':
            return '☀️';

        case 'Clouds':
            return '☁️';

        case 'Rain':
            return '🌧️';

        case 'Drizzle':
            return '🌦️';

        case 'Thunderstorm':
            return '⛈️';

        case 'Snow':
            return '❄️';

        case 'Mist':
        case 'Fog':
        case 'Haze':
            return '🌫️';

        default:
            return '🌤️';
    }
}


// Search weather
async function handleSearch() {

    const query = cityInput.value.trim();

    // If input is empty
    if (query === '') {
        return;
    }


    try {

        // API URL
        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(query)}` +
            `&appid=${API_KEY}` +
            `&units=metric`;


        // Send request
        const response = await fetch(url);


        // Check response
        if (!response.ok) {

            const errorData = await response.json();

            console.log(errorData);

            throw new Error(errorData.message);
        }



        // Convert response to JSON
        const data = await response.json();


        // Create weather object
        const weatherData = {

            icon: getWeatherIcon(data.weather[0].main),

            temp: `${Math.round(data.main.temp)}°C`,

            desc: data.weather[0].description,

            humidity: `${data.main.humidity}%`,

            wind: `${Math.round(data.wind.speed * 3.6)} km/h`

        };


        // Display weather
        renderWeather(data.name, weatherData);


    } catch (error) {

        console.error(error);


        // Display error
        renderWeather(query, {

            icon: '❌',

            temp: '—',

            desc: 'City not found',

            humidity: '—',

            wind: '—'

        });

    }


    // Clear input
    cityInput.value = '';
}


// Click Search
searchBtn.addEventListener('click', handleSearch);


// Press Enter
cityInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

        handleSearch();

    }

});
