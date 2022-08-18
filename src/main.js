'use strict';

const game = document.querySelector('.game');
const gameBtn = document.querySelector('.game-btn');
const carrotCount = document.querySelector('.carrot-count');
const gameBtnIcon = document.querySelector('.fa-solid');

const gameField = document.querySelector('.game__field');
const carrots = document.querySelector('.carrots');
const bugs = document.querySelector('.bugs');

const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpBtn = document.querySelector('.pop-up__btn');

const bgSound = new Audio('sound/bg.mp3');
const alert = new Audio('sound/alert.wav');
const bugPull = new Audio('sound/bug_pull.mp3');
const carrotPull = new Audio('sound/carrot_pull.mp3');
const gameWin = new Audio('sound/game_win.mp3');

let Timer;

carrots.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

bugs.addEventListener('dragstart', (event) => {
  event.preventDefault();
});

carrots.addEventListener('click', (event) => {
  const target = event.target;
  target.remove();
  showCarrotsNumber();
  playSound(carrotPull);
});

bugs.addEventListener('click', (event) => {
  showPopUpWithText('You Lost! 😭');
  stopTimer();
  pauseSound(bgSound);
  playSound(bugPull);
});

popUpBtn.addEventListener('click', () => {
  playSound(bgSound);
  showCarrotsBugs();
  showCarrotsNumber();
  startTimer();
  hidePopUp();
  showStopButton();
});

gameBtn.addEventListener('click', () => {
  if (gameBtnIcon.classList.contains('fa-circle-play')) {
    playSound(bgSound);
    showStopButton();
    showCarrotsBugs();
    startTimer();
    hidePopUp();
    showCarrotsNumber();
  } else {
    pauseSound(bgSound);
    showStartButton();
    showPopUpWithText('Retry? 🤪');
    stopTimer();
  }
});

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
    stopTimer();
    showPopUpWithText('You Won! 💐');
    pauseSound(bgSound);
    playSound(gameWin);
  }
}

function hidePopUp() {
  popUp.classList.add('pop-up--hide');
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
      stopTimer();
      showPopUpWithText('You Lost! 😭');
      pauseSound(bgSound);
      playSound(alert);
    }

    timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
    timerMilliSec.innerText = `${
      milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
    }`;
  }, 1);
}

function showPopUpWithText(text) {
  popUp.classList.remove('pop-up--hide');
  popUpMessage.innerText = text;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function clearAllItems() {
  const allBugs = document.querySelectorAll('.bug');
  const allCarrots = document.querySelectorAll('.carrot');
  for (let i = 0; i < allBugs.length; i++) {
    allBugs[i].remove();
  }
  for (let i = 0; i < allCarrots.length; i++) {
    allCarrots[i].remove();
  }
}

function createCarrotsBugs() {
  for (let i = 0; i < 10; i++) {
    const carrot = document.createElement('img');
    carrot.src = 'img/carrot.png';
    carrot.classList.add('carrot', 'item');
    carrots.appendChild(carrot);
  }
  for (let i = 0; i < 7; i++) {
    const bug = document.createElement('img');
    bug.src = 'img/bug.png';
    bug.classList.add('bug', 'item');
    bugs.appendChild(bug);
  }
}

function showCarrotsBugs() {
  clearAllItems();
  createCarrotsBugs();
  const items = document.querySelectorAll('.item');
  const gameRect = game.getBoundingClientRect();
  const gameWidth = gameRect.width;
  const gameHeight = gameRect.height;
  for (let i = 0; i < items.length; i++) {
    let thisItem = items[i];
    let randomTop = getRandomNumber(gameHeight / 2, gameHeight - 80);
    let randomLeft = getRandomNumber(0, gameWidth - 80);
    thisItem.style.top = `${randomTop}px`;
    thisItem.style.left = `${randomLeft}px`;
    thisItem.style.display = 'block';
  }
}

function showStartButton() {
  gameBtnIcon.classList.remove('fa-circle-stop');
  gameBtnIcon.classList.add('fa-circle-play');
}

function showStopButton() {
  gameBtnIcon.classList.add('fa-circle-stop');
  gameBtnIcon.classList.remove('fa-circle-play');
}
