class KeyboardHelper {
  constructor() {
    this.components = [];
    document.addEventListener('keydown', (event) => {
      this.handler(event, this);
    });
  }
  subscribers(components) {
    this.components = components || [];
  }
  subscribe(comp) {
    this.components.push(comp);
  }
  handler(event, _this) {
    _this.components.forEach(comp => {
      comp.onKeyEvent(event.key);
    });
  }
};

if (typeof module === 'object') {
  module.exports = KeyboardHelper;
}
