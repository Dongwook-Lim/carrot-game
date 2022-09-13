'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor() {
    this.carrotCount = document.querySelector('.carrot-count');
    this.gameBtnIcon = document.querySelector('.fa-solid');
    this.gameBtn = document.querySelector('.game-btn');
    this.gameBtn.addEventListener('click', () => {
      if (!this.started) {
        this.start();
        this.onGameStop && this.onGameStop();
      } else {
        this.stop('cancel');
      }
    });
    this.Timer = undefined;
    this.started = false;

    this.gameField = new Field();
    this.gameField.setClickListener(this.onItemClick);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.showCarrotsNumber();
    } else if (item === 'bug') {
      this.stop('lost');
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  stop(text) {
    this.started = false;
    sound.stopBg();
    this.showStartButton();
    this.stopTimer();
    this.onGameStop && this.onGameStop(text);
  }

  start() {
    this.started = true;
    this.gameField.init();
    sound.playBg();
    this.showCarrotsNumber();
    this.startTimer();
    this.showStopButton();
  }

  showStartButton() {
    this.gameBtnIcon.classList.remove('fa-circle-stop');
    this.gameBtnIcon.classList.add('fa-circle-play');
  }

  showStopButton() {
    this.gameBtnIcon.classList.add('fa-circle-stop');
    this.gameBtnIcon.classList.remove('fa-circle-play');
  }

  showCarrotsNumber() {
    const carrotsArray = document.querySelectorAll('.carrot');
    this.carrotCount.innerText = `${carrotsArray.length}`;
    if (carrotsArray.length === 0) {
      this.started = false;
      this.stop('win');
      sound.playWin();
    }
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  startTimer() {
    const timerSec = document.querySelector('.timer-sec');
    const timerMilliSec = document.querySelector('.timer-millisec');
    const firstTime = new Date();
    this.timer = setInterval(() => {
      const currentTime = new Date();
      const newTime = new Date(firstTime - currentTime);
      const seconds = newTime.getSeconds() - 50;
      let milliSeconds = Math.floor(newTime.getMilliseconds() / 10);

      if (seconds === 0) {
        milliSeconds = 0;
        this.stop('lost');
        sound.playAlert();
      }

      timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
      timerMilliSec.innerText = `${
        milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
      }`;
    }, 1);
  }
}
