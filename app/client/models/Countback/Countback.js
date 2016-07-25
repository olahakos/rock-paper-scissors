/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class CountbackComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '../../views/Countback.html';
    store = store || {
      counter: 'Round 1'
    };
    super(root, store);
  }
  changeText(newText) {
    document.getElementById('counter').innerHTML = newText;
  }
};

if (typeof module === 'object') {
  module.exports = CountbackComponent;
}
