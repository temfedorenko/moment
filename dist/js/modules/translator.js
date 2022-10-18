import { showTime } from "./time.js";
import getWeatherData from "./weather.js";
import { renderSettingsBlocks } from "./settings.js";
import { refreshQuote } from "./quotes.js";

const languageToggle = document.querySelector(".language-toggle");
const settingsLanguageTitle = document.querySelector(
  ".settings-language-title"
);
const settingsImagesTitle = document.querySelector(".settings-images-title");

export let language = languageToggle.checked ? "uk" : "en";

export function getLanguage() {
  if (languageToggle.checked) {
    language = "uk";
  } else {
    language = "en";
  }

  return language;
}

export function initTranslator() {
  getLanguage();
  showTime();
  getWeatherData();
  renderSettingsBlocks(language);
  settingsLanguageTitle.textContent = language === "en" ? "Language" : "Мова";
  settingsImagesTitle.textContent =
    language === "en" ? "Backgroung images" : "Фонові зображення";
  refreshQuote();
}

languageToggle.addEventListener("change", () => {
  getLanguage();
  showTime();
  getWeatherData();
  renderSettingsBlocks(language);
  settingsLanguageTitle.textContent = language === "en" ? "Language" : "Мова";
  settingsImagesTitle.textContent =
    language === "en" ? "Backgroung images" : "Фонові зображення";
  refreshQuote();
});

function getLocalStorageLanguage() {
  let isChecked = JSON.parse(localStorage.getItem(`lang`));

  if (localStorage.getItem("lang")) {
    languageToggle.checked = isChecked;
  }
}

getLocalStorageLanguage();

function setLocalStorageLanguage() {
  localStorage.setItem("lang", languageToggle.checked);
}

window.addEventListener("beforeunload", setLocalStorageLanguage);
