/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class PlayerComponent extends AbsComponent {
  constructor(root, store, position) {
    root = root || '../../views/Player.html';
    super(root, store);
    this.choice = 0;
    this.position = position;
  }
  startGuess() {
    return true;
  }
  endGuess() {
    return true;
  }
  addFocus() {
    const root = document.getElementById(`p${this.position}`);
    this.removeFocusAll();
    root
      .querySelector(`li:nth-child(${this.choice + 1})`)
      .className = 'active';
  }
  removeFocusAll() {
    const root = document.getElementById(`p${this.position}`);
    for (let i = 1; i <= 3; i++) {
      root
        .querySelector(`li:nth-child(${i})`)
        .className = '';
    }
  }
};

if (typeof module === 'object') {
  module.exports = PlayerComponent;
}
