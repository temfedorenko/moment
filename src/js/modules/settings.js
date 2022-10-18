import { getTimeOfDay } from "./greeting.js";

const settingsBtn = document.querySelector(".settings-trigger");
const settingsBody = document.querySelector(".settings-body");

settingsBtn.addEventListener("click", () => {
  settingsBody.classList.toggle("settings-body-active");
});

const state = {
  background: ["github", "unsplash", "flickr"],
  blocks: ["time", "weather", "player", "greeting-container", "quotes", "date"],
};

//  --------------background images settings

// --------------------------------------------Background Unsplash API

const body = document.querySelector("body");

async function getLinkUnsplashImg() {
  try {
    const timeOfDay = getTimeOfDay("en");
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=9MyO-snxDeq1ijk465PD5YK3XcgmX_S6SNLWQSnogK0`;
    const response = await fetch(url);
    const data = await response.json();
    const imageLink = data.urls.regular;

    const img = new Image();
    img.src = imageLink;

    img.onload = () => {
      body.style.backgroundImage = `url(${imageLink})`;
    };
  } catch (err) {
    setBg();
  }
}

// --------------------------------------------Background Flickr API

let randomNum;

function getRandomNum() {
  randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
}

getRandomNum();

async function getLinkFlickrImg() {
  const timeOfDay = getTimeOfDay("en");
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=90b717c15d6c3d92cd7bc70b740a6573&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();
  const imageLink = data.photos.photo[randomNum].url_l;

  const img = new Image();
  img.src = imageLink;

  img.onload = () => {
    body.style.backgroundImage = `url(${imageLink})`;
  };
}

//   -------------------------------------Background image from git

function setBg() {
  const timeOfDay = getTimeOfDay("en");
  const bgNum = randomNum < 10 ? String(randomNum).padStart(2, "0") : randomNum;
  const bgLink = `https://raw.githubusercontent.com/temfedorenko/moment-images/master/moment-images/${timeOfDay}/${bgNum}.jpg`;

  const img = new Image();
  img.src = bgLink;

  img.onload = () => {
    body.style.backgroundImage = `url(${bgLink})`;
  };
}

//   -----------------------------Slider

const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");

function getSlidePrev(f) {
  randomNum -= 1;

  if (randomNum < 1) {
    randomNum = 20;
  }

  f();
}

function getSlideNext(f) {
  randomNum += 1;

  if (randomNum > 20) {
    randomNum = 1;
  }

  f();
}

prev.addEventListener("click", () => {
  if (bgImageSrc === "github") {
    getSlidePrev(setBg);
  }

  if (bgImageSrc === "unsplash") {
    getSlidePrev(getLinkUnsplashImg);
  }

  if (bgImageSrc === "flickr") {
    getSlidePrev(getLinkFlickrImg);
  }
});

next.addEventListener("click", () => {
  if (bgImageSrc === "github") {
    getSlideNext(setBg);
  }

  if (bgImageSrc === "unsplash") {
    getSlideNext(getLinkUnsplashImg);
  }

  if (bgImageSrc === "flickr") {
    getSlideNext(getLinkFlickrImg);
  }
});

// ----------------------------------------------Settings Background

const settingsImagesWrapper = document.querySelector(".settings-images");
const settingsImages = document.querySelectorAll(".settings-image");

let bgImageSrc = "github";

if (localStorage.getItem("bgSource")) {
  bgImageSrc = localStorage.getItem("bgSource");
  document.querySelector(`#${bgImageSrc}`).checked = true;
}

function setLocalStorageBackground() {
  localStorage.setItem("bgSource", bgImageSrc);
}

window.addEventListener("beforeunload", setLocalStorageBackground);

export function getCheckedBackround() {
  settingsImages.forEach((image) => {
    if (image.value === "flickr" && bgImageSrc === "flickr") {
      getLinkFlickrImg();
    }

    if (image.value === "unsplash" && bgImageSrc === "unsplash") {
      getLinkUnsplashImg();
    }

    if (image.value === "github" && bgImageSrc === "github") {
      setBg();
    }
  });
}

settingsImagesWrapper.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".settings-image")) {
    if (e.target.value === "flickr") {
      bgImageSrc = "flickr";
      getLinkFlickrImg();
    }

    if (e.target.value === "unsplash") {
      bgImageSrc = "unsplash";
      getLinkUnsplashImg();
    }

    if (e.target.value === "github") {
      bgImageSrc = "github";
      setBg();
    }
  }
});

// //  --------------blocks settings

const settingsBlocksWrapper = document.querySelector(".settings-blocks");

export function renderSettingsBlocks(lang = "en") {
  settingsBlocksWrapper.innerHTML = `
        <div class="settings-blocks-title">${
          lang === "en" ? "Interface" : "Інтерфейс"
        }</div>
        <div class="settings-block-wrapper">
          <div class="settings-blocks-left">
            <label for="time">${lang === "en" ? "Time" : "Час"}</label>
            <input class="settings-block" type="checkbox" id="time" checked>
            <label for="weather">${lang === "en" ? "Weather" : "Погода"}</label>
            <input class="settings-block" type="checkbox" id="weather" checked>
            <label for="player">${lang === "en" ? "Player" : "Музика"}</label>
            <input class="settings-block" type="checkbox" id="player" checked>
          </div>
          <div class="settings-blocks-right">
            <label for="date">${lang === "en" ? "Date" : "Дата"}</label>
            <input class="settings-block" type="checkbox" id="date" checked>
            <label for="greeting-container">${
              lang === "en" ? "Greeting" : "Вітання"
            }</label>
            <input class="settings-block" type="checkbox" id="greeting-container" checked>
            <label for="quotes">${lang === "en" ? "Quotes" : "Цитати"}</label>
            <input class="settings-block" type="checkbox" id="quotes" checked>
          </div>
        </div>

`;

  getLokalStorageBlock();
}

renderSettingsBlocks();

const settingsBlocks = document.querySelectorAll(".settings-block");

function getLokalStorageBlock() {
  state.blocks.forEach((block) => {
    let isChecked = JSON.parse(localStorage.getItem(`${block}`));

    if (localStorage.getItem(`${block}`)) {
      document.querySelector(`#${block}`).checked = isChecked;
    }
  });
}

getLokalStorageBlock();

function hideBlock(selector) {
  document.querySelector(selector).classList.add("hiddenBlock");
}

function showBlock(selector) {
  document.querySelector(selector).classList.remove("hiddenBlock");
}

function hideBlocksFromLocalStorage() {
  settingsBlocks.forEach((block) => {
    if (!block.checked) {
      const selector = block.getAttribute("id");
      hideBlock(`.${selector}`);
    }
  });
}

hideBlocksFromLocalStorage();

settingsBlocksWrapper.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".settings-block")) {
    let blockId = e.target.getAttribute("id");

    localStorage.setItem(`${blockId}`, e.target.checked);

    state.blocks.forEach((block) => {
      if (block === blockId && !e.target.checked) {
        hideBlock(`.${block}`);
      }

      if (block === blockId && e.target.checked) {
        showBlock(`.${block}`);
      }
    });
  }
});
