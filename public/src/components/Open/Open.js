/*global Component:true*/

var AbsComponent;
if (typeof Component === 'undefined') {
  AbsComponent = require('../../utils/Component');
} else {
  AbsComponent = Component;
}

class OpenComponent extends AbsComponent {
  constructor(root, store) {
    root = root || '/src/components/Open/open.html';
    super(root);
    const openParams = {msg: 'hit there'};
    this.store = store || {
      headline: 'Rock - Papper -Scissors',
      menu1: 'Player VS Computer',
      menu2: 'Computer VS Computer'
    };
  }
};

if (typeof module === 'object') {
  module.exports = OpenComponent;
}
