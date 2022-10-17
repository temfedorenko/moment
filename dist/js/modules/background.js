// import { getTimeOfDay } from './greeting.js';

// const body = document.querySelector('body');

// export async function getLinkUnsplashImg() {
//   const timeOfDay = getTimeOfDay();
//   const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=9MyO-snxDeq1ijk465PD5YK3XcgmX_S6SNLWQSnogK0`;
//   const response = await fetch(url);
//   const data = await response.json();
//   const imageLink = data.urls.regular;

//   const img = new Image();
//   img.src = imageLink;

//   img.onload = () => {
//     body.style.backgroundImage = `url(${imageLink})`;
//   };
// }

// // --------------------------------------------Background Flickr API

// let randomNum;

// export function getRandomNum() {
//   randomNum = Math.floor(Math.random() * (20 - 1 + 1) + 1);
// }

// getRandomNum();

// export async function getLinkFlickrImg() {
//   const timeOfDay = getTimeOfDay();
//   const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=90b717c15d6c3d92cd7bc70b740a6573&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;

//   const response = await fetch(url);
//   const data = await response.json();
//   const imageLink = data.photos.photo[randomNum].url_l;

//   const img = new Image();
//   img.src = imageLink;

//   img.onload = () => {
//     body.style.backgroundImage = `url(${imageLink})`;
//   };
// }

// //   ------------------------------------------------Background image from git

// export function setBg() {
//   const timeOfDay = getTimeOfDay();
//   const bgNum = randomNum < 10 ? String(randomNum).padStart(2, '0') : randomNum;
//   const bgLink = `https://raw.githubusercontent.com/temfedorenko/moment-images/master/moment-images/${timeOfDay}/${bgNum}.jpg`;

//   const img = new Image();
//   img.src = bgLink;

//   img.onload = () => {
//     body.style.backgroundImage = `url(${bgLink})`;
//   };
// }

// //   Slider

// const prev = document.querySelector('.slide-prev');
// const next = document.querySelector('.slide-next');
// const settingsImages = document.querySelectorAll('.settings-image');

// // export let bgImageSrc = 'github';

// // settingsImages.forEach(image => {
// //   if (image.value === 'flickr' && bgImageSrc === 'flickr') {
// //     console.log(32);
// //     getLinkFlickrImg();
// //     setListenerPrev(getLinkFlickrImg);
// //     setListenerNext(getLinkFlickrImg);
// //   } else if (image.value === 'unsplash' && bgImageSrc === 'unsplash') {
// //     getLinkUnsplashImg();
// //     setListenerPrev(getLinkUnsplashImg);
// //     setListenerNext(getLinkUnsplashImg);
// //   } else if (image.value === 'github' && bgImageSrc === 'github') {
// //     console.log(1);
// //     setBg();
// //     setListenerPrev(setBg);
// //     setListenerNext(setBg);
// //   }
// // });
// // settingsImages.forEach(image => {
// //   if (image.value === 'flickr' && image.checked) {
// //     getLinkFlickrImg();
// //     setListenerPrev(getLinkFlickrImg);
// //     setListenerNext(getLinkFlickrImg);
// //   } else if (image.value === 'unsplash' && image.checked) {
// //     getLinkUnsplashImg();
// //     setListenerPrev(getLinkUnsplashImg);
// //     setListenerNext(getLinkUnsplashImg);
// //   } else {
// //     setBg();
// //     setListenerPrev(setBg);
// //     setListenerNext(setBg);
// //   }
// // });

// function getSlidePrev(f) {
//   randomNum -= 1;

//   if (randomNum < 1) {
//     randomNum = 20;
//   }

//   // setBg();
//   //   getLinkUnsplashImg();
//   //   getLinkFlickrImg();
//   f();
// }

// function getSlideNext(f) {
//   randomNum += 1;

//   if (randomNum > 20) {
//     randomNum = 1;
//   }

//   // setBg();
//   //  getLinkUnsplashImg();
//   //   getLinkFlickrImg();
//   f();
// }

// export function setListenerPrev(f) {
//   prev.addEventListener('click', () => {
//     getSlidePrev(f);
//   });
// }

// // setListenerPrev(setBg);

// export function setListenerNext(f) {
//   next.addEventListener('click', () => {
//     console.log('next');
//     getSlideNext(f);
//   });
// }

// // setListenerNext(setBg);
