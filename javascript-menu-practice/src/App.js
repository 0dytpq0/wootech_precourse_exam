import Validator from './validator/validator.js';
import Controller from './controller/Controller.js';
class App {
  async play() {
    const controller = new Controller(new Validator());
    await controller.startRecommand();
  }
}

const aa = new App();
aa.play();
export default App;
