import { showTime } from './time.js';
import getWeatherData from './weather.js';

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

const state = {
  background: ['github', 'unsplash', 'flickr'],
  blocks: ['time', 'weather', 'player', 'greeting-container', 'quotes', 'date'],
};

const settingsBlocksWrapper = document.querySelector('.settings-blocks');

function renderSettingsBlocks(lang) {
  settingsBlocksWrapper.innerHTML = `
<div class="settings-blocks-title">${lang === 'en' ? 'Interface' : 'Інтерфейс'}</div>
        <label for="time">${lang === 'en' ? 'Time' : 'Час'}</label>
        <input class="settings-block" type="checkbox" id="time" checked>
        <label for="weather">${lang === 'en' ? 'Weather' : 'Погода'}</label>
        <input class="settings-block" type="checkbox" id="weather" checked>
        <label for="player">${lang === 'en' ? 'Player' : 'Музика'}</label>
        <input class="settings-block" type="checkbox" id="player" checked>
        <label for="greeting-container">${lang === 'en' ? 'Greeting' : 'Вітання'}</label>
        <input class="settings-block" type="checkbox" id="greeting-container" checked>
        <label for="quotes">${lang === 'en' ? 'Quotes' : 'Вислови'}</label>
        <input class="settings-block" type="checkbox" id="quotes" checked>
        <label for="date">${lang === 'en' ? 'Date' : 'Дата'}</label>
        <input class="settings-block" type="checkbox" id="date" checked>
`;
}

renderSettingsBlocks(language);

const settingsBlocks = document.querySelectorAll('.settings-block');

function getLokalStorageBlock() {
  state.blocks.forEach(block => {
    let isChecked = JSON.parse(localStorage.getItem(`${block}`));

    if (localStorage.getItem(`${block}`)) {
      document.querySelector(`#${block}`).checked = isChecked;
    }
  });
}

getLokalStorageBlock();

function hideBlock(selector) {
  document.querySelector(selector).classList.add('hiddenBlock');
}

function showBlock(selector) {
  document.querySelector(selector).classList.remove('hiddenBlock');
}

function hideBlocksFromLocalStorage() {
  settingsBlocks.forEach(block => {
    if (!block.checked) {
      const selector = block.getAttribute('id');
      hideBlock(`.${selector}`);
    }
  });
}

hideBlocksFromLocalStorage();

settingsBlocksWrapper.addEventListener('click', e => {
  if (e.target && e.target.matches('.settings-block')) {
    let blockId = e.target.getAttribute('id');

    localStorage.setItem(`${blockId}`, e.target.checked);

    state.blocks.forEach(block => {
      if (block === blockId && !e.target.checked) {
        hideBlock(`.${block}`);
      }

      if (block === blockId && e.target.checked) {
        showBlock(`.${block}`);
      }
    });
  }
});
