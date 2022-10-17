import { showTime } from "./modules/time.js";
import getWeatherData from "./modules/weather.js";
import getQuotesData from "./modules/quotes.js";
import playerWindow from "./modules/player.js";
import settings from "./modules/settings.js";
// import { getLanguage } from "./modules/translator.js";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  showTime();
  getWeatherData();
  getQuotesData();
  playerWindow();
  settings();
  // getLanguage();
});
