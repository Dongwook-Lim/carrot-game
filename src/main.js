'use strict';

import PopUp from './popup.js';

const game = document.querySelector('.game');
const gameBtn = document.querySelector('.game-btn');
const carrotCount = document.querySelector('.carrot-count');
const gameBtnIcon = document.querySelector('.fa-solid');

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const bgSound = new Audio('sound/bg.mp3');
const alert = new Audio('sound/alert.wav');
const bugPull = new Audio('sound/bug_pull.mp3');
const carrotPull = new Audio('sound/carrot_pull.mp3');
const gameWin = new Audio('sound/game_win.mp3');

const gameFinishBanner = new PopUp();

const CARROT_SIZE = 80;

let Timer;
let started = false;

field.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

field.addEventListener('click', (event) => {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    showCarrotsNumber();
    playSound(carrotPull);
  } else if (target.matches('.bug')) {
    stopGame('You Lost! 😭');
    playSound(bugPull);
  }
});

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
  initGame();
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

function initGame() {
  field.innerHTML = '';
  addItems('carrot', 15, 'img/carrot.png');
  addItems('bug', 7, 'img/bug.png');
}

function addItems(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('src', imgPath);
    item.setAttribute('class', className);
    field.appendChild(item);
    item.style.position = 'absolute';
    const x = getRandomNumber(x1, x2);
    const y = getRandomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
  }
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
