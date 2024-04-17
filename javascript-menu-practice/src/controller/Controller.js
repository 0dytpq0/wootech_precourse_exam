import Recommand from '../model/Recommand.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class Controller {
  #validator;

  constructor(validator) {
    this.#validator = validator;
  }

  async startRecommand() {
    OutputView.printPrompt('점심 메뉴 추천을 시작합니다.');
    const coaches = await this.applyCoaches();
    const notEatMenu = await this.applyNotEatMenu(coaches);
    const recommand = new Recommand(coaches, notEatMenu);
    const categories = recommand.choiceCategory();
    const totalRecommand = recommand.generateWeekMenus(categories);
    OutputView.printResult(totalRecommand, categories);
  }

  async applyCoaches() {
    while (true) {
      try {
        const coaches = await InputView.getCoaches();
        this.#validator.IsValidCoaches(coaches);
        return coaches;
      } catch ({ message }) {
        console.log(message);
      }
    }
  }

  async applyNotEatMenu(coaches) {
    while (true) {
      try {
        const coachesObj = coaches.reduce((acc, name) => {
          return { ...acc, [name]: [] };
        }, {});
        for (const coach of coaches) {
          const notEatMenu = await InputView.getCantEatMenu(coach);
          this.#validator.IsValidNotEatMenu(notEatMenu);
          coachesObj[coach] = notEatMenu.map((menu) => menu.trim());
        }

        return coachesObj;
      } catch ({ message }) {
        console.log(message);
      }
    }
  }
}

export default Controller;
