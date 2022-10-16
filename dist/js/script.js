import time from './modules/time.js';
import { setBg, getLinkUnsplashImg, getLinkFlickrImg } from './modules/background.js';
import getWeatherData from './modules/weather.js';
import getQuotesData from './modules/quotes.js';
import playerWindow from './modules/player.js';
import settings from './modules/settings.js';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  time();

  // settingsImages.forEach(image => {
  //   console.log(image);
  // });

  // setBg();
  // getLinkUnsplashImg();
  // getLinkFlickrImg();

  getWeatherData();
  getQuotesData();
  playerWindow();
  settings();
});
