'use strict';

import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
const game = new Game();

gameFinishBanner.setClickListener(() => {
  game.start();
});

game.setGameStopListener((reason) => {
  if (reason) {
    let message;
    switch (reason) {
      case 'cancel':
        message = 'Retry?🤪';
        break;
      case 'lost':
        message = 'You Lost!❌';
        break;
      case 'win':
        message = 'You Won!!!💐';
        break;
      default:
        throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
  } else {
    gameFinishBanner.hide();
  }
});
