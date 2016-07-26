/*global PlayerComponent:true*/

var AbsComponent;
if (typeof PlayerComponent === 'undefined') {
  AbsComponent = require('./Player');
} else {
  AbsComponent = PlayerComponent;
}

class ComputerComponent extends AbsComponent {
  constructor(root, store, position) {
    super(root, store, position);
    this.store.onClick = 'return(true)';
  }
  startGuess() {
    this.removeFocusAll();
    this.choice = Math.round(Math.random() * 2);
  }
  endGuess() {
    this.addFocus();
  }
};

if (typeof module === 'object') {
  module.exports = ComputerComponent;
}
