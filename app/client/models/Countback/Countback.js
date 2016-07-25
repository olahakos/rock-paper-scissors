/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../Component/Component');
} else {
  AbsComponent = Component;
}

class CountbackComponent extends AbsComponent {
  constructor(root, store, texts, delayTime) {
    root = root || '../../views/Countback.html';

    store = store || {
      counter: 'Get Ready'
    };
    super(root, store);
    this.delayTime = delayTime || 1000;
    this.texts = texts || [
      '3',
      '2',
      '1'
    ];
    this.textState = 0;
  }
  changeText(newText) {
    document.getElementById('counter').innerHTML = newText;
  }
  startCounter(_this, callback, parent) {
    _this.changeText(_this.texts[_this.textState]);
    if (++_this.textState < _this.texts.length) {
      setTimeout(() => {
        _this.startCounter(_this, callback, parent);
      }, _this.delayTime);
    } else {
      setTimeout(() => {
        this.reset();
        callback(parent);
      }, _this.delayTime);
    }
  }
  reset() {
    this.textState = 0;
    this.changeText('');
  }
};

if (typeof module === 'object') {
  module.exports = CountbackComponent;
}
