/*global OpenComponent:true*/
/*global TutorialComponent:true*/
/*global GameComponent:true*/
/*global Controller:true*/

var AbsController;
if (typeof Controller === 'undefined') {
  AbsController = require('../models/Controller');
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
  }
  _landingPage() {
    return this.mountComponent(this.open, this.root);
  }
  _tutorialPage() {
    return this.mountComponent(this.tutorial, this.root);
  }
  _startGame(gameType) {
    // TODO: start game function
    return this.mountComponent(this.game, this.root);
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
      GameComponent: new GameComponent()
    }
  );
  app._landingPage();
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
