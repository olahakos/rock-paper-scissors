/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class OpenComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/open.html';
    store = store || {
      headline: 'Rock - Papper -Scissors',
      menu1: 'Player VS Computer',
      menu2: 'Computer VS Computer',
      tutorial: 'How to play',
      tutorialOnClick: 'app._tutorialPage()',
      menu1OnClick: 'app._startGame("UVC")',
      menu2OnClick: 'app._startGame("CVC")'
    };
    super(root, store);
  }
};

if (typeof module === 'object') {
  module.exports = OpenComponent;
}
