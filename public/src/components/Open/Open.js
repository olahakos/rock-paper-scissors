/*global Component:true*/

class OpenComponent extends Component {
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
