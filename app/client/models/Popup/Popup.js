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
    super(root, store);
    this.reset();
  }
  updateTexts(params) {
    this.store.headline = params.winnerText;
    this.store.points = `${params.points[0]} / ${params.points[1]}`;
    this.store.result = params.result;
    this.store.details = '';
    this.store.startText = params.startText || 'Next Round [ENTER]';
    this.store.backText = params.backText || 'Quit Game [ESC]';
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
  reset(store) {
    this.store = {
      headline: 'Round 1',
      points: '',
      result: '',
      details: 'You have <b>3 secounds</b> to choose.<br/>Push the <b>[1] [2] [3]</b> buttons to select you weapon.',
      startText: 'Start Game [ENTER]',
      startClick: 'app._startRound()',
      backText: 'Back [ESC]',
      backClick: 'app._landingPage()'
    };
  }
};

if (typeof module === 'object') {
  module.exports = PopupComponent;
}
