class Controller {
  constructor(root) {
    this.root = root;
  }
  mountComponent(LoadComponent, target) {
    target = target || this.root;
    if (!LoadComponent) {
      throw new ParamException('Parameter Error');
    }
    return LoadComponent
      .getHtml()
      .then(html => {
        target.innerHTML = html;
        return true;
      })
      .catch((err) => {
        throw err;
      });
  }
}
if (typeof module === 'object') {
  module.exports = Controller;
}

function ParamException(message) {
  this.message = message;
  this.name = 'ParamException';
}
