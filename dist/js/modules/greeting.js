import { language } from './translator.js';

const greeting = document.querySelector('.greeting');

export function getTimeOfDay(lang) {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 6) {
    timeOfDay = lang === 'en' ? 'night' : 'ночі';
  } else if (hours < 12) {
    timeOfDay = lang === 'en' ? 'morning' : 'ранку';
  } else if (hours < 18) {
    timeOfDay = lang === 'en' ? 'afternoon' : 'дня';
  } else if (hours < 24) {
    timeOfDay = lang === 'en' ? 'evening' : 'вечора';
  }

  return timeOfDay;
}

export function showGreeting() {
  const timeOfDay = getTimeOfDay(language);
  greeting.textContent = language === 'en' ? `Good ${timeOfDay},` : `Доброго ${timeOfDay},`;

  nameInput.placeholder = language === 'en' ? '[Enter name]' : "[Введіть ім'я]";
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
