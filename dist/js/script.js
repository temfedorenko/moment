'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Clock and Calendar

  const day = document.querySelector('.date');
  const time = document.querySelector('.time');
  const greeting = document.querySelector('.greeting');
  const body = document.querySelector('body');

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;

    showDate();
    showGreeting();

    setInterval(showTime, 1000);
  }

  showTime();

  function showDate() {
    const date = new Date();

    const currentDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    day.textContent = currentDate;
  }

  // Greeting

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay;

    if (hours < 6) {
      timeOfDay = 'night';
    } else if (hours < 12) {
      timeOfDay = 'morning';
    } else if (hours < 18) {
      timeOfDay = 'afternoon';
    } else if (hours < 24) {
      timeOfDay = 'evening';
    }

    return timeOfDay;
  }

  function showGreeting() {
    const timeOfDay = getTimeOfDay();
    greeting.textContent = `Good ${timeOfDay},`;
  }

  // Save name

  const nameInput = document.querySelector('.name');

  function getLokalStorageName() {
    if (localStorage.getItem('name')) {
      nameInput.value = localStorage.getItem('name');
    }
  }

  getLokalStorageName();

  function setLocalStorageName() {
    localStorage.setItem('name', nameInput.value);
  }

  window.addEventListener('beforeunload', setLocalStorageName);

  //   Backgrond image from git

  let randomNum;

  function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  }

  getRandomNum();

  function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum < 10 ? String(randomNum).padStart(2, '0') : randomNum;
    const bgLink = `https://raw.githubusercontent.com/temfedorenko/moment-images/master/moment-images/${timeOfDay}/${bgNum}.jpg`;

    const img = new Image();
    img.src = bgLink;

    img.onload = () => {
      body.style.backgroundImage = `url(${bgLink})`;
    };
  }

  // setTimeout(setBg, 4000);
  setBg();

  //   Slider

  const prev = document.querySelector('.slide-prev');
  const next = document.querySelector('.slide-next');

  function getSlidePrev() {
    randomNum -= 1;

    if (randomNum < 1) {
      randomNum = 20;
    }

    setBg();
  }

  function getSlideNext() {
    randomNum += 1;

    if (randomNum > 20) {
      randomNum = 1;
    }

    setBg();
  }

  prev.addEventListener('click', getSlidePrev);
  next.addEventListener('click', getSlideNext);

  // Weather
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

  // getWeather();

  //  Save city

  getLokalStorageCity();

  function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
  }

  window.addEventListener('beforeunload', setLocalStorageCity);

  // Quotes

  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const quoteChanger = document.querySelector('.change-quote');
  const quoteBody = document.querySelector('.quote-body');

  const quoteImage = new Image();
  quoteImage.src = '../img/loading-buffering.gif';
  quoteImage.style.cssText = 'width: 24px; height: 24px;';

  async function getQuotes() {
    quote.insertAdjacentElement('afterbegin', quoteImage);
    await fetch('https://type.fit/api/quotes', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const quoteNumber = Math.round(Math.random() * 1643);
        quote.textContent = data[quoteNumber].text;
        author.textContent = data[quoteNumber].author;
      })
      .catch(() => {
        quote.textContent = 'Server error, please, try later';
      });
  }

  getQuotes();

  quoteChanger.addEventListener('click', () => {
    quote.textContent = '';
    author.textContent = '';
    getQuotes();
  });
});
