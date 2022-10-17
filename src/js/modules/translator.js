import { showTime } from "./time.js";
import getWeatherData from "./weather.js";
import settings from "./settings.js";

const languageToggle = document.querySelector(".language-toggle");

export let language = languageToggle.checked ? "ua" : "en";

function getLanguage() {
  if (languageToggle.checked) {
    language = "ua";
  } else {
    language = "en";
  }

  return language;
}

languageToggle.addEventListener("change", () => {
  getLanguage();
  showTime();
  getWeatherData();
  settings();
});
// console.log(language);
