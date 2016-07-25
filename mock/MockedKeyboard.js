class MockedKeyboard {

  constructor(html) {
    this.mockHtml = html || '<div>Lorem ipsum</div>';
  }
  getHtml() {
    return Promise.resolve(this.mockHtml);
  }
  subscribers() {}
  subscribe() {}
}

module.exports = MockedKeyboard;
