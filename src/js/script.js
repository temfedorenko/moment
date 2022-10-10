'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Clock and Calendar

  const day = document.querySelector('.date');
  const time = document.querySelector('.time');
  const greeting = document.querySelector('.greeting');

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

  // const nameInput = document.querySelector('.name');

  // nameInput.addEventListener('change', () => {
  //   const userName = nameInput.value;
  //   console.log(userName);

  //   // nameInput.value = userName;
  // });
});
