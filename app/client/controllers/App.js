/*global OpenComponent:true*/
/*global TutorialComponent:true*/
/*global GameComponent:true*/
/*global CountbackComponent:true*/
/*global PlayerComponent:true*/
/*global ComputerComponent:true*/
/*global Controller:true*/

var AbsController;
if (typeof Controller === 'undefined') {
  AbsController = require('../models/Controller/Controller');
} else {
  AbsController = Controller;
}

class App extends AbsController {
  constructor(root, components) {
    super(root);
    if (!components.OpenComponent) {
      throw new ParamException('OpenComponent not found');
    }
    this.open = components.OpenComponent;
    this.tutorial = components.TutorialComponent;
    this.game = components.GameComponent;
    this.countback = components.CountbackComponent;
  }
  _landingPage() {
    return this.mountComponent(this.open, this.root);
  }
  _tutorialPage() {
    return this.mountComponent(this.tutorial, this.root);
  }
  _startGame(gameType) {
    return this.mountComponent(this.game, this.root)
    .then(() => {
      return this.game._startGame(gameType);
    })
    .then(() => {
      const p1 = document.getElementById('p1');
      return this.mountComponent(this.game.p1, p1);
    })
    .then(() => {
      const p2 = document.getElementById('p2');
      return this.mountComponent(this.game.p2, p2);
    })
    .then(() => {
      return this.game._startGame(gameType);
    })
    .then(() => {
      return this._startRound();
    });
  }
  _startRound() {
    const countbackCnt = document.getElementById('countback');
    this.mountComponent(this.countback, countbackCnt)
      .then(() => {
        return this.countback.startCounter(
          this.countback,
          this._endRound,
          this
        );
      })
      .then(() => {
        return this.game._startRound();
      });
  }
  _endRound(_this) {
    _this.game._endRound();
  }
}

if (typeof module === 'object') {
  // for testing
  module.exports = App;
} else {
  // for live environment
  var app = new App(
    document.getElementById('root'),
    {
      OpenComponent: new OpenComponent(),
      TutorialComponent: new TutorialComponent(),
      GameComponent: new GameComponent(PlayerComponent, ComputerComponent),
      CountbackComponent: new CountbackComponent()
    }
  );
  app._landingPage();
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
