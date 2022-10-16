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

  city.addEventListener('change', () => {
    userCity = city.value;
    getWeather();
  });

  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=en&appid=26385191cf2115e9533991a95ea5c8df&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      weatherError.textContent = 'city not found, please, try to enter your neerest city';
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
    feelsLike.textContent = `feels like: ${Math.round(data.main.feels_like)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `humidity: ${Math.round(data.main.humidity)}%`;
    wind.textContent = `wind speed: ${data.wind.speed.toFixed(1)} m/s`;
    weatherError.textContent = '';
  }

  //  Save city

  getLokalStorageCity();

  function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
  }

  window.addEventListener('beforeunload', setLocalStorageCity);
};

export default getWeatherData;
