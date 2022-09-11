'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor() {
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
    this.field.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick('bug');
    }
  };

  init() {
    this.field.innerHTML = '';
    this._addItems('carrot', 15, 'img/carrot.png');
    this._addItems('bug', 7, 'img/bug.png');
  }

  _addItems(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('src', imgPath);
      item.setAttribute('class', className);
      this.field.appendChild(item);
      item.style.position = 'absolute';
      const x = getRandomNumber(x1, x2);
      const y = getRandomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
    }
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
