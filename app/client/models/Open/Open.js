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
      menu1: '[1] Player VS Computer',
      menu2: '[2] Computer VS Computer',
      menu3: '[3] How to play',
      menu1OnClick: 'app._startGame("UVC")',
      menu2OnClick: 'app._startGame("CVC")',
      menu3OnClick: 'app._tutorialPage()'
    };
    super(root, store);
  }
  onKeyEvent(event) {
    if (!document.getElementById('open')) { return; }
    switch (event) {
      case '1':
        document.getElementById('menu1').click();
        break;
      case '2':
        document.getElementById('menu2').click();
        break;
      case '3':
        document.getElementById('menu3').click();
        break;
      default:
        break;
    }
  }
};

if (typeof module === 'object') {
  module.exports = OpenComponent;
}
