/*global OpenComponent:true*/
/*global TutorialComponent:true*/
/*global GameComponent:true*/
/*global CountbackComponent:true*/
/*global UserComponent:true*/
/*global ComputerComponent:true*/
/*global PopupComponent:true*/
/*global KeyboardHelper:true*/
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
    this.popup = components.PopupComponent;
    this.keyHelper = components.KeyboardHelper;

    this.keyHelper.subscribers([
      this.open,
      this.tutorial,
      this.popup,
      this.game
    ]);
  }
  _landingPage() {
    this.popup.reset();
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
        return this._openPopup();
      });
  }
  _openPopup() {
    const popup = document.getElementById('popupCnt');
    return this.mountComponent(this.popup, popup);
  }
  _closePopup() {
    document.getElementById('popupCnt').innerHTML = '';
    document.getElementById('p1').className = '';
    document.getElementById('p2').className = '';
  }
  _startRound() {
    this._closePopup();
    const countbackCnt = document.getElementById('countbackCnt');
    return this.mountComponent(this.countback, countbackCnt)
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
    _this.popup.updateTexts({
      winnerText: _this.game.winnerText,
      points: _this.game.points
    });
    _this._openPopup();
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
      GameComponent: new GameComponent(UserComponent, ComputerComponent),
      CountbackComponent: new CountbackComponent(),
      PopupComponent: new PopupComponent(),
      KeyboardHelper: new KeyboardHelper()
    }
  );
  app._landingPage();
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
