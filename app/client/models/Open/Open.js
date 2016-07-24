/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component');
} else {
  AbsComponent = Component;
}

class OpenComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/open.html';
    super(root);
    const openParams = {msg: 'hit there'};
    this.store = store || {
      headline: 'Rock - Papper -Scissors',
      menu1: 'Player VS Computer',
      menu2: 'Computer VS Computer',
      tutorial: 'How to play',
      tutorialOnClick: 'app._tutorialPage()',
      menu1OnClick: 'app._startGame(1)',
      menu2OnClick: 'app._startGame(2)'
    };
  }
};

if (typeof module === 'object') {
  module.exports = OpenComponent;
}
