class MockedGame {

  constructor(User, Computer, html) {
    this.mockHtml = html;
    this.p1 = new User();
    this.p2 = new Computer();
  };
  getHtml() {
    return Promise.resolve(this.mockHtml);
  }
  _startGame() {}
}

module.exports = MockedGame;
