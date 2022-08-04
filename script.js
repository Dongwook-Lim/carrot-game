const gameBtn = document.querySelector('.game-btn');
const icon = document.querySelector('.fa-solid');
const main = document.querySelector('main');
const retryBox = document.querySelector('.retry-container');
const retryBoxText = document.querySelector('.game-result');
const retryBtn = document.querySelector('.retry-btn');
const carrotNumber = document.querySelector('.carrot-number');
const itemsContainer = document.querySelector('.items-container');
const carrots = document.querySelector('.carrots');
const bugs = document.querySelector('.bugs');

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
  showRetryBox('You Lost! 😭');
  stopTimer();
  pauseSound(bgSound);
  playSound(bugPull);
});

retryBtn.addEventListener('click', () => {
  playSound(bgSound);
  showCarrotsBugs();
  showCarrotsNumber();
  startTimer();
  removeRetryBox();
  showStopButton();
});

gameBtn.addEventListener('click', () => {
  if (icon.classList.contains('fa-circle-play')) {
    playSound(bgSound);
    showStopButton();
    showCarrotsBugs();
    startTimer();
    removeRetryBox();
    showCarrotsNumber();
  } else {
    pauseSound(bgSound);
    showStartButton();
    showRetryBox('Retry? 🤪');
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
  carrotNumber.innerText = `${carrotsArray.length}`;
  if (carrotsArray.length === 0) {
    stopTimer();
    showRetryBox('You Won! 💐');
    pauseSound(bgSound);
    playSound(gameWin);
  }
}

function removeRetryBox() {
  retryBox.style.display = 'none';
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
      showRetryBox('You Lost! 😭');
      pauseSound(bgSound);
      playSound(alert);
    }

    timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
    timerMilliSec.innerText = `${
      milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
    }`;
  }, 1);
}

function showRetryBox(text) {
  retryBox.style.display = 'flex';
  retryBoxText.innerText = text;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function clearAllItems() {
  const allBugs = document.querySelectorAll('.bug');
  const allCarrots = document.querySelectorAll('.carrot');
  for (i = 0; i < allBugs.length; i++) {
    allBugs[i].remove();
  }
  for (i = 0; i < allCarrots.length; i++) {
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
  const mainRect = main.getBoundingClientRect();
  const mainWidth = mainRect.width;
  const mianHeight = mainRect.height;
  for (let i = 0; i < items.length; i++) {
    let thisItem = items[i];
    let randomTop = getRandomNumber(mianHeight / 2, mianHeight - 80);
    let randomLeft = getRandomNumber(0, mainWidth - 80);
    thisItem.style.top = `${randomTop}px`;
    thisItem.style.left = `${randomLeft}px`;
    thisItem.style.display = 'block';
  }
}

function showStartButton() {
  icon.classList.remove('fa-circle-stop');
  icon.classList.add('fa-circle-play');
}

function showStopButton() {
  icon.classList.add('fa-circle-stop');
  icon.classList.remove('fa-circle-play');
}
