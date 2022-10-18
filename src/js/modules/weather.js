import { language } from './translator.js';

const getWeatherData = () => {
  const city = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const feelsLike = document.querySelector('.feels-like');
  const weatherDescription = document.querySelector('.weather-description');
  const humidity = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');
  const weatherError = document.querySelector('.weather-error');

  let userCity;

  function getLokalStorageCity() {
    if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
      userCity = localStorage.getItem('city');
      getWeather();
    } else {
      city.value = 'Kyiv';
      userCity = 'Kyiv';
      getWeather();
    }
  }

  getLokalStorageCity();

  city.addEventListener('change', () => {
    userCity = city.value;
    getWeather();
    localStorage.setItem('city', city.value);
  });

  const weatherTranslation = {
    en: {
      weatherError: 'city not found, please, try to enter your neerest city',
      feelsLike: 'feels like: ',
      humidity: 'humidity: ',
      wind: 'wind speed: ',
    },
    uk: {
      weatherError: 'Місто не знайдемо, спробуйте, будь ласка, вказати найближче до вас місто',
      feelsLike: 'за відчуттями: ',
      humidity: 'вологість: ',
      wind: 'швидкість вітру: ',
    },
  };

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=${language}&appid=26385191cf2115e9533991a95ea5c8df&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      weatherError.textContent =
        language === 'en' ? weatherTranslation.en.weatherError : weatherTranslation.uk.weatherError;

      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      feelsLike.textContent = '';
      weatherDescription.textContent = '';
      humidity.textContent = '';
      wind.textContent = '';
    }

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feelsLike.textContent =
      language === 'en'
        ? weatherTranslation.en.feelsLike + `${Math.round(data.main.feels_like)}°C`
        : weatherTranslation.uk.feelsLike + `${Math.round(data.main.feels_like)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent =
      language === 'en'
        ? weatherTranslation.en.humidity + `${Math.round(data.main.humidity)}%`
        : weatherTranslation.uk.humidity + `${Math.round(data.main.humidity)}%`;
    wind.textContent = `wind speed: ${data.wind.speed.toFixed(1)} m/s`;
    wind.textContent =
      language === 'en'
        ? weatherTranslation.en.wind + `${data.wind.speed.toFixed(1)} m/s`
        : weatherTranslation.uk.wind + `${data.wind.speed.toFixed(1)} м/с`;
    weatherError.textContent = '';
  }
};

export default getWeatherData;
