class Player {
  constructor () {
    this.resetRound();
  }
  resetRound() {
    this.choice = null;
  }
};

if (typeof module === 'object') {
  module.exports = Player;
}
