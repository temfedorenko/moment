import { language } from "./translator.js";

const greeting = document.querySelector(".greeting");

export function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 6) {
    timeOfDay = language === "en" ? "night" : "ночі";
  } else if (hours < 12) {
    timeOfDay = language === "en" ? "morning" : "ранку";
  } else if (hours < 18) {
    timeOfDay = language === "en" ? "afternoon" : "дня";
  } else if (hours < 24) {
    timeOfDay = language === "en" ? "evening" : "вечора";
  }

  return timeOfDay;
}

// Треба зробити функцію partOfDay для background з git

export function showGreeting() {
  const timeOfDay = getTimeOfDay();
  greeting.textContent =
    language === "en" ? `Good ${timeOfDay},` : `Доброго ${timeOfDay},`;

  nameInput.placeholder = language === "en" ? "[Enter name]" : "[Введіть ім'я]";
}

// Save name

const nameInput = document.querySelector(".name");

function getLokalStorageName() {
  if (localStorage.getItem("name")) {
    nameInput.value = localStorage.getItem("name");
  }
}

getLokalStorageName();

function setLocalStorageName() {
  localStorage.setItem("name", nameInput.value);
}

window.addEventListener("beforeunload", setLocalStorageName);
