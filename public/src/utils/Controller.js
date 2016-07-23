class Controller {
  constructor(root) {
    this.root = root;
  }
  loadElement(LoadComponent, params, target) {
    target = target || this.root;
    if (!LoadComponent || !params) {
      throw new UserException('Parameter Error');
    }
    return LoadComponent
      .getHtml(params)
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

function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
