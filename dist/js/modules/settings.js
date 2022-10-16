import {
  setBg,
  getLinkUnsplashImg,
  getLinkFlickrImg,
  setListenerPrev,
  setListenerNext,
} from './background.js';

const settings = () => {
  const settingsBtn = document.querySelector('.settings-trigger');
  const settingsBody = document.querySelector('.settings-body');

  settingsBtn.addEventListener('click', () => {
    settingsBody.classList.toggle('settings-body-active');
  });

  const state = {
    background: ['github', 'unsplash', 'flickr'],
    blocks: ['time', 'weather', 'player', 'greeting-container', 'quotes', 'date'],
  };

  //  --------------language settings

  //  --------------background images settings
  const settingsImagesWrapper = document.querySelector('.settings-images');
  const settingsImages = document.querySelectorAll('.settings-image');

  function checkBackgroundInput() {
    settingsImagesWrapper.addEventListener('click', e => {
      if (e.target && e.target.matches('.settings-image')) {
        console.log();
        // let e.target.value = e.target.getAttribute('id');
        if (e.target.value === 'flickr') {
          getLinkFlickrImg();
          setListenerPrev(getLinkFlickrImg);
          setListenerNext(getLinkFlickrImg);
        } else if (e.target.value === 'unsplash') {
          getLinkUnsplashImg();
          setListenerPrev(getLinkUnsplashImg);
          setListenerNext(getLinkUnsplashImg);
        } else if (e.target.value === 'github') {
          setBg();
          setListenerPrev(setBg);
          setListenerNext(setBg);
        }
      }
    });
  }

  checkBackgroundInput();

  // console.log(settingsImages[0].value);

  // settingsImagesWrapper.addEventListener('click', e => {
  //   if (e.target && e.target.matches('.settings-image')) {
  //     let imageId = e.target.getAttribute('id');
  //     console.log(imageId);

  //     localStorage.setItem(`${imageId}`, e.target.checked);

  //     state.background.forEach(item => {
  //       if (item === imageId && !e.target.checked) {
  //         console.log('1');
  //       } else if (item === imageId && e.target.checked) {
  //         console.log(e.target.checked);
  //       }
  //     });
  //   }
  // });

  //  --------------blocks settings

  const settingsBlocksWrapper = document.querySelector('.settings-blocks');
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
        } else if (block === blockId && e.target.checked) {
          showBlock(`.${block}`);
        }
      });
    }
  });
};

export default settings;
