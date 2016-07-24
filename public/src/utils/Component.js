class Component {
  constructor (template, store) {
    this.template = template;
    this.store = store || {};
  }
  getHtml(loader, getData) {
    loader = loader || fetch;
    getData = getData || (data => (data.text()));
    return loader(this.template)
      .then(data => {
        return getData(data);
      })
      .then(data => {
        this.html = this._replaceParams(data, this.store);
        return this.html;
      })
      .catch((err) => {
        throw err;
      });
  }
  _replaceParams(html, params) {
    for (let key in params) {
      let re = new RegExp(`{${key}}`, 'g');
      html = html.replace(re, params[key]);
    };
    return html;
  }
};

if (typeof module === 'object') {
  module.exports = Component;
}
