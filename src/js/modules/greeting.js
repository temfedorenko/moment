const greeting = document.querySelector('.greeting');

export function getTimeOfDay() {
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

export function showGreeting() {
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
