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
    this.components = [];
    this.winnerText = '';
  }
  _startGame(gameType) {
    this.reset();
    switch (gameType) {
      case 'UVC':
        this.p1 = new this.UserClass(null, {name: 'Player 1 - User'}, 1);
        this.p2 = new this.ComputerClass(null, {name: 'Player 2 - Computer'}, 2);
        this.components.push(this.p1);
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
    this.rounds++;
  }
  _endRound() {
    this.p1.endGuess();
    this.p2.endGuess();
    const winner = this.whoWon(this.p1.choice, this.p2.choice);
    switch (winner) {
      case 1:
        this.points[0]++;
        break;
      case 2:
        this.points[1]++;
        break;
      default:
        break;
    }
    this.winnerText = (winner > 0) ? this[`p${winner}`].name + ' WON' : 'I\'s a draw';
  }
  whoWon(c1, c2) {
    if (c1 === 0 && c2 === 1) { return 2; } // Papper beats Rock
    if (c1 === 0 && c2 === 2) { return 1; } // Rock beats Scissors
    if (c1 === 1 && c2 === 2) { return 2; } // Scissors beats Papper
    if (c1 === 1 && c2 === 0) { return 1; } // Papper beats Rock
    if (c1 === 2 && c2 === 0) { return 2; } // Rock beats Scissors
    if (c1 === 2 && c2 === 1) { return 1; } // Scissors beats Papper
    return 0;
  }
  onKeyEvent(event) {
    if (!document.getElementById('game')) { return; }
    this.components.forEach(comp => {
      comp.onKeyEvent(event);
    });
  }
  reset() {
    this.components = [];
    this.points = [0, 0];
    this.rounds = 1;
  }
};

if (typeof module === 'object') {
  module.exports = GameComponent;
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
