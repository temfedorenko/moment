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

  function getLokalStorage() {
    if (localStorage.getItem('name')) {
      nameInput.value = localStorage.getItem('name');
    }
  }

  getLokalStorage();

  function setLocalStorage() {
    localStorage.setItem('name', nameInput.value);
  }

  window.addEventListener('beforeunload', setLocalStorage);

  //   Backgrond image from git

  let randomNum;

  function getRandomNum() {
    randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  }

  getRandomNum();

  console.log(String(randomNum).padStart(2, '0'));

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
});
