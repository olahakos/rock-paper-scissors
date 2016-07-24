/*global OpenComponent:true*/
/*global TutorialComponent:true*/
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
  }
  _landingPage() {
    return this.loadElement(this.open, this.root);
  }
  _tutorialPage() {
    return this.loadElement(this.tutorial, this.root);
  }
  _startGame(gameType) {
    // TODO: start game function
    return true;
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
      TutorialComponent: new TutorialComponent()
    }
  );
  app._landingPage();
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
