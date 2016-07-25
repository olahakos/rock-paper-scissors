/*global PlayerComponent:true*/

var AbsComponent;
if (typeof PlayerComponent === 'undefined') {
  AbsComponent = require('./Player');
} else {
  AbsComponent = PlayerComponent;
}

class UserComponent extends AbsComponent {
  startGuess(focusCallback) {
    document.addEventListener('keydown', (event) => {
      this.keyEventListener(event, this);
    });
  }
  endGuess() {
    document.removeEventListener('keydown', (event) => {
      this.keyEventListener(event, this);
    });
  }
  keyEventListener(event, _this) {
    let needRender = true;
    switch (event.key) {
      case '1':
        _this.choice = 0;
        break;
      case '2':
        _this.choice = 1;
        break;
      case '3':
        _this.choice = 2;
        break;
      default:
        needRender = false;
        break;
    }
    if (needRender) {
      _this.addFocus();
    }
  }
};

if (typeof module === 'object') {
  module.exports = UserComponent;
}
