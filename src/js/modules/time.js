import { showGreeting } from './greeting.js';
import { language } from './translator.js';

const day = document.querySelector('.date');
const time = document.querySelector('.time');

export function showTime() {
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

  const currentDate = date.toLocaleDateString(`${language}`, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  day.textContent = currentDate[0].toUpperCase() + currentDate.slice(1);
}
