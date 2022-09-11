'use strict';

const bgSound = new Audio('sound/bg.mp3');
const alert = new Audio('sound/alert.wav');
const bugPull = new Audio('sound/bug_pull.mp3');
const carrotPull = new Audio('sound/carrot_pull.mp3');
const gameWin = new Audio('sound/game_win.mp3');

export function playBg() {
  playSound(bgSound);
}

export function playAlert() {
  playSound(alert);
}

export function playBug() {
  playSound(bugPull);
}

export function playCarrot() {
  playSound(carrotPull);
}

export function playWin() {
  playSound(gameWin);
}

export function stopBg() {
  stopSound(bgSound);
}

function stopSound(sound) {
  sound.pause();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
