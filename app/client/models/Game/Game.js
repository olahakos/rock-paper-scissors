/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class GameComponent extends AbsComponent {
  constructor(UserClass, ComputerClass, root, store) {
    root = root || '../../views/Game.html';
    store = store || {
    };
    super(root, store);

    this.UserClass = UserClass;
    this.ComputerClass = ComputerClass;
    this.p1 = this.p2 = {};
  }
  _startGame(gameType) {
    switch (gameType) {
      case 'UVC':
        this.p1 = new this.UserClass(null, {name: 'Player 1 - User'}, 1);
        this.p2 = new this.ComputerClass(null, {name: 'Player 2 - Computer'}, 2);
        break;
      case 'CVC':
        this.p1 = new this.ComputerClass(null, {name: 'Player 1 - Computer'}, 1);
        this.p2 = new this.ComputerClass(null, {name: 'Player 2 - Computer'}, 2);
        break;
      default:
        throw new ParamException('No gameType added');
    }
  }
  _startRound() {
    this.p1.startGuess(this._addFocus);
    this.p2.startGuess(this._addFocus);
  }
  _endRound() {
    this.p1.endGuess();
    this.p2.endGuess();
    console.log(this.p1.choice);
    console.log(this.p2.choice);
  }
};

if (typeof module === 'object') {
  module.exports = GameComponent;
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
