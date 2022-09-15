'use strict';

import Field, { ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  won: 'won',
  lost: 'lost',
  cancel: 'cancel',
});

export class GameBuilder {
  withCarrotNumber(num) {
    this.carrotNumber = num;
    return this;
  }

  withBugNumber(num) {
    this.bugNumber = num;
    return this;
  }

  build() {
    return new Game(
      this.carrotNumber, //
      this.bugNumber
    );
  }
}

class Game {
  constructor(carrotNumber, bugNumber) {
    this.carrotNumber = carrotNumber;
    this.bugNumber = bugNumber;
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

    this.gameField = new Field(carrotNumber, bugNumber);
    this.gameField.setClickListener(this.onItemClick);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.showCarrotsNumber();
    } else if (item === ItemType.bug) {
      this.stop('lost');
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  stop(reason) {
    this.started = false;
    sound.stopBg();
    this.showStartButton();
    this.stopTimer();
    this.onGameStop && this.onGameStop(reason);
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
      this.stop('won');
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
      }

      timerSec.innerText = `${seconds < 10 ? '0' + seconds : seconds}`;
      timerMilliSec.innerText = `${
        milliSeconds < 10 ? '0' + milliSeconds : milliSeconds
      }`;
    }, 1);
  }
}
