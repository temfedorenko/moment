import { showTime } from "./modules/time.js";
import getWeatherData from "./modules/weather.js";
import playerWindow from "./modules/player.js";
import { getCheckedBackround } from "./modules/settings.js";
import { initTranslator } from "./modules/translator.js";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  initTranslator();
  showTime();
  getWeatherData();
  playerWindow();
  getCheckedBackround();
});
