import EventController from './controller/EventController.js';
import Event from './domain/Event.js';
import InputView from './ui/InputView.js';
import OutputView from './ui/OutputView.js';
import Validator from './domain/Validator.js';

class App {
  #eventController;

  constructor() {
    this.#eventController = new EventController(
      new Event(),
      new Validator(),
      InputView,
      OutputView
    );
  }

  async run() {
    await this.#eventController.startReservation();
  }
}

const a = new App();
a.run();
export default App;
