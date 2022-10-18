import { showTime } from './time.js';
import getWeatherData from './weather.js';
import { renderSettingsBlocks } from './settings.js';

const languageToggle = document.querySelector('.language-toggle');
const settingsLanguageTitle = document.querySelector('.settings-language-title');
const settingsImagesTitle = document.querySelector('.settings-images-title');

export let language = languageToggle.checked ? 'uk' : 'en';

function getLanguage() {
  if (languageToggle.checked) {
    language = 'uk';
  } else {
    language = 'en';
  }

  return language;
}

languageToggle.addEventListener('change', () => {
  getLanguage();
  showTime();
  getWeatherData();
  renderSettingsBlocks(language);
  settingsLanguageTitle.textContent = language === 'en' ? 'Language' : 'Мова';
  settingsImagesTitle.textContent = language === 'en' ? 'Backgroung images' : 'Фонові зображення';
});
