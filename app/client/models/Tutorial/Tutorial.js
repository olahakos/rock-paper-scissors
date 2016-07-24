/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component');
} else {
  AbsComponent = Component;
}

class TutorialComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/Tutorial.html';
    store = store || {
      onClick: 'app._landingPage()'
    };
    super(root, store);
  }
};

if (typeof module === 'object') {
  module.exports = TutorialComponent;
}
