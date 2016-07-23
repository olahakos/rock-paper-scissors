class Controller {
  constructor(root) {
    this.root = root;
  }
  loadElement(LoadComponent, params, target) {
    LoadComponent
      .getHtml(params)
      .then(html => {
        this.root.innerHTML = html;
      })
      .catch((err) => {
        throw err;
      });
  }
}
if (typeof module === 'object') {
  module.exports = Controller;
}
