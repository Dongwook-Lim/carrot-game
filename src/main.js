'use strict';

import PopUp from './popup.js';
import Field from './field.js';

const gameBtn = document.querySelector('.game-btn');
const carrotCount = document.querySelector('.carrot-count');
const gameBtnIcon = document.querySelector('.fa-solid');

const bgSound = new Audio('sound/bg.mp3');
const alert = new Audio('sound/alert.wav');
const bugPull = new Audio('sound/bug_pull.mp3');
const carrotPull = new Audio('sound/carrot_pull.mp3');
const gameWin = new Audio('sound/game_win.mp3');

const gameFinishBanner = new PopUp();
const gameField = new Field();

let Timer;
let started = false;

gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    showCarrotsNumber();
  } else if (item === 'bug') {
    stopGame('You Lost! 😭');
  }
}

gameFinishBanner.setClickListener(() => {
  startGame();
});

gameBtn.addEventListener('click', () => {
  if (!started) {
    startGame();
    gameFinishBanner.hide();
  } else {
    stopGame('Retry? 🤪');
  }
});

function stopGame(text) {
  started = false;
  pauseSound(bgSound);
  showStartButton();
  gameFinishBanner.showWithText(text);
  stopTimer();
}

function startGame() {
  started = true;
  gameField.init();
  playSound(bgSound);
  showCarrotsNumber();
  startTimer();
  showStopButton();
}

function pauseSound(sound) {
  sound.pause();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function showCarrotsNumber() {
  const carrotsArray = document.querySelectorAll('.carrot');
  carrotCount.innerText = `${carrotsArray.length}`;
  if (carrotsArray.length === 0) {
    started = false;
    stopGame('You Won! 💐');
    playSound(gameWin);
  }
}

function stopTimer() {
  clearInterval(Timer);
}

function startTimer() {
  const timerSec = document.querySelector('.timer-sec');
  const timerMilliSec = document.querySelector('.timer-millisec');
  const firstTime = new Date();
  Timer = setInterval(() => {
    const currentTime = new Date();
    const newTime = new Date(firstTime - currentTime);
    const seconds = newTime.getSeconds() - 50;
    let milliSeconds = Math.floor(newTime.getMilliseconds() / 10);

    if (seconds === 0) {
      milliSeconds = 0;
      stopGame('You Lost! 😭');
      playSound(alert);
    }

    timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
    timerMilliSec.innerText = `${
      milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
    }`;
  }, 1);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function showStartButton() {
  gameBtnIcon.classList.remove('fa-circle-stop');
  gameBtnIcon.classList.add('fa-circle-play');
}

function showStopButton() {
  gameBtnIcon.classList.add('fa-circle-stop');
  gameBtnIcon.classList.remove('fa-circle-play');
}
