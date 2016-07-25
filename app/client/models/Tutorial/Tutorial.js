/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
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
  onKeyEvent(event) {
    if (!document.getElementById('tutorial')) { return; }
    if (event === 'Escape' || event === 'Enter') {
      document.getElementById('tutorialBack').click();
    }
  }
};

if (typeof module === 'object') {
  module.exports = TutorialComponent;
}
