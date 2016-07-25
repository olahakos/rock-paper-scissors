/*global PlayerComponent:true*/

var AbsComponent;
if (typeof PlayerComponent === 'undefined') {
  AbsComponent = require('./Player');
} else {
  AbsComponent = PlayerComponent;
}

class UserComponent extends AbsComponent {
  constructor(root, store, position) {
    super(root, store, position);
    this.listen = false;
  }
  startGuess() {
    this.removeFocusAll();
    this.listen = true;
  }
  endGuess() {
    this.listen = false;
  }
  onKeyEvent(event) {
    if (!this.listen) { return; }
    let needRender = true;
    switch (event) {
      case '1':
        this.choice = 0;
        break;
      case '2':
        this.choice = 1;
        break;
      case '3':
        this.choice = 2;
        break;
      default:
        needRender = false;
        break;
    }
    if (needRender) {
      this.addFocus();
    }
  }
};

if (typeof module === 'object') {
  module.exports = UserComponent;
}
