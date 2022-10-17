import time from './modules/time.js';
import getWeatherData from './modules/weather.js';
import getQuotesData from './modules/quotes.js';
import playerWindow from './modules/player.js';
import settings from './modules/settings.js';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  time();
  getWeatherData();
  getQuotesData();
  playerWindow();
  settings();
});
