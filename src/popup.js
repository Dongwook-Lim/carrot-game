'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpMessage = document.querySelector('.pop-up__message');
    this.popUpBtn = document.querySelector('.pop-up__btn');
    this.popUpBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }

  showWithText(text) {
    this.popUp.classList.remove('pop-up--hide');
    this.popUpMessage.innerText = text;
  }
}
