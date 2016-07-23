class Controller {
  constructor(root) {
    this.root = root;
  }
  setHeader(LoadComponent, params) {
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
