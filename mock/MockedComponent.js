class MockedComponent {

  constructor(html) {
    this.mockHtml = html || '<div>Lorem ipsum</div>';
  };
  getHtml() {
    return Promise.resolve(this.mockHtml);
  }
}

module.exports = MockedComponent;
