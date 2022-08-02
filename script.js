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

let Timer;

carrots.addEventListener('click', (event) => {
  const target = event.target;
  target.remove();
  showCarrotsNumber();
});

bugs.addEventListener('click', (event) => {
  showRetryBox('You Lost! 😭');
  stopTimer();
});

retryBtn.addEventListener('click', () => {
  showCarrotsBugs();
  showCarrotsNumber();
  startTimer();
  removeRetryBox();
  showStopButton();
});

gameBtn.addEventListener('click', () => {
  if (icon.classList.contains('fa-circle-play')) {
    showStopButton();
    showCarrotsBugs();
    startTimer();
    removeRetryBox();
    showCarrotsNumber();
  } else {
    showStartButton();
    showRetryBox('Retry? 🤪');
    stopTimer();
  }
});

function showCarrotsNumber() {
  const carrotsArray = document.querySelectorAll('.carrot');
  carrotNumber.innerText = `${carrotsArray.length}`;
  if (carrotsArray.length === 0) {
    stopTimer();
    showRetryBox('You Won! 💐');
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
    const newTime = new Date(currentTime - firstTime);
    const seconds = newTime.getSeconds();
    const milliSeconds = Math.floor(newTime.getMilliseconds() / 10);

    timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
    timerMilliSec.innerText = `${
      milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
    }`;
    if (seconds === 10) {
      stopTimer();
      showRetryBox('You Lost! 😭');
    }
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
