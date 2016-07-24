/*global OpenComponent:true*/
/*global Controller:true*/

class App extends Controller {
  constructor() {
    super(document.getElementById('root'));
  }
}
let app = new App();

const Open = new OpenComponent();
app.loadElement(Open, app.root);
