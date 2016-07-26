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
    this.store.position = position;
    this.name = (store && store.name) ? store.name : 'Anonymus';
  }
  startGuess() {
    return true;
  }
  endGuess() {
    return true;
  }
  addFocus() {
    this.removeFocusAll();
    document
      .getElementById(`p${this.position}`)
      .getElementsByClassName('buttonCnt')[0]
      .querySelector(`div:nth-child(${this.choice + 1})`)
      .className = 'active';
  }
  removeFocusAll() {
    const root = document.getElementById(`p${this.position}`);
    for (let i = 1; i <= 3; i++) {
      document
        .getElementById(`p${this.position}`)
        .getElementsByClassName('buttonCnt')[0]
        .querySelector(`div:nth-child(${i})`)
        .className = '';
    }
  }
};

if (typeof module === 'object') {
  module.exports = PlayerComponent;
}
