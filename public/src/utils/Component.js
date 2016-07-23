class Component {
  constructor (template) {
    this.template = template;
    this.html = '';
  }
  getHtml(params) {
    return fetch(this.template)
      .then(data => {
        return data.text();
      })
      .then(data => {
        this.html = this._replaceParams(data, params);
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
