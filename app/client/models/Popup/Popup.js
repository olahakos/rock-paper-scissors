/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class PopupComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/Popup.html';
    store = store || {
      headline: 'Round 1',
      points: '0 / 0',
      details: 'You have 3 secound to choose. Push the [1] [2] [3] buttons to select you symbole.',
      startText: 'Start Game',
      startClick: 'app._startRound()',
      backText: 'Back',
      backClick: 'app._landingPage()'
    };
    super(root, store);
  }
  updateTexts(params) {
    this.store.headline = params.winnerText;
    this.store.points = `${params.points[0]} / ${params.points[1]}`;
    this.store.startText = 'Next Round';
    this.store.backText = 'Quit Game';
  }
  onKeyEvent(event) {
    if (!document.getElementById('popup')) { return; }
    switch (event) {
      case 'Escape':
        document.getElementById('popupBack').click();
        break;
      case 'Enter':
        document.getElementById('popupStart').click();
        break;
      default:
        break;
    }
  }
};

if (typeof module === 'object') {
  module.exports = PopupComponent;
}
