'use strict';

import playList from './playList.js';

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
  }
  showTime();
  setInterval(showTime, 1000);

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

  // --------------------------------------------------------------------------Background Unsplash API

  // async function getLinkUnsplashImg() {
  //   const timeOfDay = getTimeOfDay();
  //   const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=9MyO-snxDeq1ijk465PD5YK3XcgmX_S6SNLWQSnogK0`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   const imageLink = data.urls.regular;

  //   const img = new Image();
  //   img.src = imageLink;

  //   img.onload = () => {
  //     body.style.backgroundImage = `url(${imageLink})`;
  //   };
  // }

  // getLinkUnsplashImg();

  // -------------------------------------------------------------------------Background Flickr API

  let randomNum;

  function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  }

  getRandomNum();

  // async function getLinkFlickrImg() {
  //   const timeOfDay = getTimeOfDay();
  //   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=90b717c15d6c3d92cd7bc70b740a6573&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;

  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log(data);

  //   const imageLink = data.photos.photo[randomNum].url_l;

  //   const img = new Image();
  //   img.src = imageLink;

  //   img.onload = () => {
  //     body.style.backgroundImage = `url(${imageLink})`;
  //   };
  // }

  // getLinkFlickrImg();

  //   -------------------------------------------------------------------------Backgrond image from git

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
    // getLinkUnsplashImg();
    getLinkFlickrImg();
  }

  function getSlideNext() {
    randomNum += 1;

    if (randomNum > 20) {
      randomNum = 1;
    }

    setBg();
    // getLinkUnsplashImg();
    // getLinkFlickrImg();
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

  const quoteImage = new Image();
  quoteImage.src = './img/loading-buffering.gif';
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

  // Simple Audio Player

  const audio = new Audio('./sounds/red-hot-chili-peppers-dark-necessities.mp3');
  const audioPrev = document.querySelector('.play-prev');
  const audioNext = document.querySelector('.play-next');
  const audioPlay = document.querySelector('.play');
  const soundsList = document.querySelector('.play-list');

  let playItem;

  function renderPlayList() {
    playList.forEach(item => {
      playItem = document.createElement('li');
      playItem.classList.add('play-item');
      playItem.textContent = item.title;
      soundsList.append(playItem);
    });
  }

  renderPlayList();

  let isPlay = false;
  let playNum = 0;

  function deleteActiveClass() {
    Array.from(soundsList.children).forEach(item => {
      item.classList.remove('item-active');
    });
  }

  function addActiveClass() {
    soundsList.children[playNum].classList.add('item-active');
  }

  function playAudio() {
    deleteActiveClass();
    addActiveClass();

    if (isPlay) {
      audio.play();
      audioPlay.classList.add('pause');
    } else {
      audio.pause();
      audioPlay.classList.remove('pause');
    }
  }

  audioPlay.addEventListener('click', () => {
    isPlay = isPlay ? false : true;
    playAudio(playNum);
  });

  function nextSong() {
    playNum += 1;

    if (playNum > playList.length - 1) {
      playNum = 0;
    }

    audio.src = playList[playNum].src;
    isPlay = true;
    playAudio(playNum);
    audioPlay.classList.add('pause');
    trackTitle.textContent = playList[playNum].title;
  }

  audioNext.addEventListener('click', nextSong);

  function prevSong() {
    playNum -= 1;

    if (playNum < 0) {
      playNum = playList.length - 1;
    }

    audio.src = playList[playNum].src;
    isPlay = true;
    playAudio(playNum);
    audioPlay.classList.add('pause');
    trackTitle.textContent = playList[playNum].title;
  }

  audioPrev.addEventListener('click', prevSong);

  audio.addEventListener('ended', nextSong);

  // Advanced audioplayer

  const trackTitle = document.querySelector('.track-title');
  const currentTime = document.querySelector('.current-time');
  const trackDuration = document.querySelector('.duration');
  const timeline = document.querySelector('.timeline');
  const progress = document.querySelector('.progress');
  const volumeInput = document.querySelector('.volume-input');
  const volumeBtn = document.querySelector('.volume-btn');

  // Progress Bar

  function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTime.textContent = convertTimeFromSeconds(audio.currentTime);
    trackDuration.textContent = playList[playNum].duration;
  }

  audio.addEventListener('timeupdate', updateProgress);

  function setProgress(e) {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / timelineWidth) * audio.duration;
  }

  timeline.addEventListener('click', setProgress);

  // setInterval(updateProgress, 500);

  function convertTimeFromSeconds(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = min === 'NaN:NaN' ? `0:00` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    return `${min}:${sec}`;
  }

  //  -----Volume-----

  volumeInput.addEventListener('input', () => {
    audio.volume = volumeInput.value;
  });

  volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('no-volume');

    if (volumeBtn.classList.contains('no-volume')) {
      audio.volume = 0;
      volumeInput.value = 0;
    } else {
      audio.volume = 0.5;
      volumeInput.value = 0.5;
    }
  });

  // -------------------------------------------------------------------------Settings

  const settingsBtn = document.querySelector('.settings-trigger');
  const settingsBody = document.querySelector('.settings-body');
  const settingsBlocksWrapper = document.querySelector('.settings-elements');
  const settingsBlocks = document.querySelectorAll('.settings-element');

  settingsBtn.addEventListener('click', () => {
    settingsBody.classList.toggle('settings-body-active');
  });

  // 1 установить всем тру
  // 2 добавить тру в локал
  // 3 изменить локал когда переключили
  // 4 проверить значение в локал и установить флажок

  const state = {
    blocks: ['time', 'weather', 'player', 'greeting-container', 'quotes', 'date'],
  };

  function getLokalStorageBlock() {
    state.blocks.forEach(block => {
      let isChecked = JSON.parse(localStorage.getItem(`${block}`));
      // console.log(isChecked);

      if (localStorage.getItem(`${block}`)) {
        console.log((document.querySelector(`#${block}`).checked = isChecked));
        // document.querySelector(`#${block}`).checked = Boolean(localStorage.getItem(`${block}`));
      }
    });
  }

  // settingsBlocks.forEach(block => {
  //   let blockId = block.getAttribute('id');
  //   localStorage.setItem(`${blockId}`, block.checked);
  // });

  getLokalStorageBlock();

  function hideBlock(selector) {
    document.querySelector(selector).classList.add('hiddenBlock');
  }

  function showBlock(selector) {
    document.querySelector(selector).classList.remove('hiddenBlock');
  }

  function getBlocksCheckedProperty() {
    settingsBlocks.forEach(block => {
      if (!block.checked) {
        const selector = block.getAttribute('id');
        hideBlock(`.${selector}`);
      }
    });
  }

  getBlocksCheckedProperty();

  settingsBlocksWrapper.addEventListener('click', e => {
    if (e.target && e.target.matches('.settings-element')) {
      let blockId = e.target.getAttribute('id');

      // getLokalStorageBlock();

      localStorage.setItem(`${blockId}`, e.target.checked);

      state.blocks.forEach(block => {
        if (block === blockId && !e.target.checked) {
          hideBlock(`.${block}`);
        } else if (block === blockId && e.target.checked) {
          showBlock(`.${block}`);
        }
      });
    }
  });

  // function setLocalStorageBlock() {
  //   settingsBlocks.forEach(block => {
  //     localStorage.setItem(`isChecked`, false);
  //   });
  // }
});
