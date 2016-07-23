/*global OpenComponent:true*/
/*global Controller:true*/

class App extends Controller {
  constructor() {
    super(document.getElementById('root'));
  }
}
let app = new App();
app.setHeader(new OpenComponent(), {msg: 'hit there'});
