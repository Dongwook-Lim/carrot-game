'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder().withCarrotNumber(5).withBugNumber(3).build();

gameFinishBanner.setClickListener(() => {
  game.start();
});

game.setGameStopListener((reason) => {
  if (reason) {
    let message;
    switch (reason) {
      case Reason.cancel:
        message = 'Retry?🤪';
        sound.playBug();
        break;
      case Reason.lost:
        message = 'You Lost!❌';
        sound.playAlert();
        break;
      case Reason.won:
        message = 'You Won!!!💐';
        sound.playWin();
        break;
      default:
        throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
  } else {
    gameFinishBanner.hide();
  }
});
