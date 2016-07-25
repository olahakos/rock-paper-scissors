/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class PlayerComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/Player.html';
    super(root, store);
    this.choice = 0;
  }
  startGuess() {
    return true;
  }
  endGuess() {
    return true;
  }
};

if (typeof module === 'object') {
  module.exports = PlayerComponent;
}
