/*global OpenComponent:true*/
/*global Controller:true*/

class App extends Controller {
  constructor() {
    super(document.getElementById('root'));
  }
}
let app = new App();

const Open = new OpenComponent('/src/components/Open/open.html');
const openParams = {msg: 'hit there'};
app.loadElement(Open, openParams, app.root);
