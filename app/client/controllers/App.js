/*global OpenComponent:true*/
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
  }
  _landingPage() {
    return this.loadElement(this.open, this.root);
  }
}

if (typeof module === 'object') {
  // for testing
  module.exports = App;
} else {
  // for live environment
  let app = new App(
    document.getElementById('root'),
    {
      OpenComponent: new OpenComponent()
    }
  );
  app._landingPage();
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
