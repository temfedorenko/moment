import { showGreeting } from './greeting.js';

const time = () => {
  const day = document.querySelector('.date');
  const time = document.querySelector('.time');

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
};

export default time;
