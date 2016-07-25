/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class CountbackComponent extends AbsComponent {
  constructor(callback, root, store, texts, delayTime) {
    root = root || '../../views/Countback.html';

    store = store || {
      counter: 'Get Ready'
    };
    super(root, store);
    this.delayTime = delayTime || 500;
    this.texts = texts || [
      'Choose NOW!',
      '3',
      '2',
      '1'
    ];
    this.textState = 0;
    this.callback = callback;
  }
  changeText(newText) {
    document.getElementById('counter').innerHTML = newText;
  }
  counter(_this) {
    _this.changeText(_this.texts[_this.textState]);
    if (++_this.textState < _this.texts.length) {
      setTimeout(() => {
        _this.counter(_this);
      }, _this.delayTime);
    } else {
      setTimeout(_this.callback, _this.delayTime);
    }
  }
};

if (typeof module === 'object') {
  module.exports = CountbackComponent;
}
