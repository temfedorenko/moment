import playList from "./playList.js";

// Simple Audio Player

const playerWindow = () => {
  const audio = new Audio(
    "./sounds/red-hot-chili-peppers-dark-necessities.mp3"
  );
  const audioPrev = document.querySelector(".play-prev");
  const audioNext = document.querySelector(".play-next");
  const audioPlay = document.querySelector(".play");
  const soundsList = document.querySelector(".player__play-list");

  let playItem;

  function renderPlayList() {
    playList.forEach((item) => {
      playItem = document.createElement("li");
      playItem.classList.add("play-item");
      playItem.textContent = item.title;
      soundsList.append(playItem);
    });
  }

  renderPlayList();

  let isPlay = false;
  let playNum = 0;

  function deleteActiveClass() {
    Array.from(soundsList.children).forEach((item) => {
      item.classList.remove("item-active");
    });
  }

  function addActiveClass() {
    soundsList.children[playNum].classList.add("item-active");
  }

  function playAudio() {
    deleteActiveClass();
    addActiveClass();

    if (isPlay) {
      audio.play();
      audioPlay.classList.add("pause");
    } else {
      audio.pause();
      audioPlay.classList.remove("pause");
    }
  }

  audioPlay.addEventListener("click", () => {
    isPlay = isPlay ? false : true;
    playAudio(playNum);
  });

  function nextSong() {
    playNum += 1;

    if (playNum > playList.length - 1) {
      playNum = 0;
    }

    audio.src = playList[playNum].src;
    isPlay = true;
    playAudio(playNum);
    audioPlay.classList.add("pause");
    trackTitle.textContent = playList[playNum].title;
  }

  audioNext.addEventListener("click", nextSong);

  function prevSong() {
    playNum -= 1;

    if (playNum < 0) {
      playNum = playList.length - 1;
    }

    audio.src = playList[playNum].src;
    isPlay = true;
    playAudio(playNum);
    audioPlay.classList.add("pause");
    trackTitle.textContent = playList[playNum].title;
  }

  audioPrev.addEventListener("click", prevSong);

  audio.addEventListener("ended", nextSong);

  // Advanced audioplayer

  const trackTitle = document.querySelector(".player__title");
  const currentTime = document.querySelector(".player__current-time");
  const trackDuration = document.querySelector(".player__duration");
  const timeline = document.querySelector(".player__timeline");
  const progress = document.querySelector(".timeline__progress");
  const volumeInput = document.querySelector(".player__volume-input");
  const volumeBtn = document.querySelector(".player__volume-btn");

  // Progress Bar

  function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTime.textContent = convertTimeFromSeconds(audio.currentTime);
    trackDuration.textContent = playList[playNum].duration;
  }

  audio.addEventListener("timeupdate", updateProgress);

  function setProgress(e) {
    const timelineWidth = e.currentTarget.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime = (clickX / timelineWidth) * audio.duration;
  }

  timeline.addEventListener("click", setProgress);

  // setInterval(updateProgress, 500);

  function convertTimeFromSeconds(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = min === "NaN:NaN" ? `0:00` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    return `${min}:${sec}`;
  }

  //  -----Volume-----

  volumeInput.addEventListener("input", () => {
    audio.volume = volumeInput.value;

    if (volumeInput.value > 0) {
      volumeBtn.classList.remove("no-volume");
    }

    if (volumeInput.value == 0) {
      volumeBtn.classList.add("no-volume");
    }
  });

  volumeBtn.addEventListener("click", () => {
    volumeBtn.classList.toggle("no-volume");

    if (volumeBtn.classList.contains("no-volume")) {
      audio.volume = 0;
      volumeInput.value = 0;
    } else {
      audio.volume = 0.5;
      volumeInput.value = 0.5;
    }
  });
};

export default playerWindow;
