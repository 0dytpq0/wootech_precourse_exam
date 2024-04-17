import Controller from './controller/Controller.js';
import { OutputView } from './view/OutputView.js';

class App {
  #controller;

  constructor() {
    this.#controller = new Controller();
  }

  async run() {
    OutputView.printPrompt(
      '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
      true
    );
    const date = await this.#controller.applyDate();
    const menus = await this.#controller.applyMenus();
    OutputView.printPrompt(
      '12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
      true
    );
    OutputView.printMenu(menus);
    const eventDiscount = this.getEventDiscount(date, menus);
    const totalPurchase = this.getTotalPurchase(menus);
    const presentationDiscount = this.getGiveChampgne(totalPurchase);
    this.#controller.printBenefitsDetail(date, menus);
    const totalDiscount = this.getTotalDiscount(
      eventDiscount,
      presentationDiscount
    );
    this.getTotalAfterBenefits(menus, totalDiscount);
    this.getBadge(totalPurchase, totalDiscount);
  }

  getEventDiscount(date, menus) {
    const [kindOfDiscount, discount] = this.#controller.applyWeekDiscount(
      date,
      menus
    );
    const eventDiscount = discount + this.#controller.applyDdayDiscount(date);

    return eventDiscount;
  }

  getTotalPurchase(menus) {
    const totalPurchase = this.#controller.applyTotalPurchase(menus);
    this.#controller.printTotalPurchase(totalPurchase);

    return totalPurchase;
  }

  getGiveChampgne(totalPurchase) {
    const presentationDiscount =
      this.#controller.applyGiveChampagne(totalPurchase);
    this.#controller.printGiveChampagne(presentationDiscount);

    return presentationDiscount;
  }

  getTotalDiscount(eventDiscount, presentationDiscount) {
    const totalDiscount = eventDiscount + presentationDiscount;
    this.#controller.printTotalDiscount(totalDiscount);

    return totalDiscount;
  }

  getTotalAfterBenefits(menus, totalDiscount) {
    const totalAfterBenefits = this.#controller.applyAmountAfterBenefits(
      menus,
      totalDiscount
    );
    this.#controller.printAmountAfterBenefits(totalAfterBenefits);

    return totalAfterBenefits;
  }

  getBadge(totalPurchase, totalDiscount) {
    const badge = this.#controller.applyGiveBadge(totalPurchase, totalDiscount);
    this.#controller.printKindOfBadge(badge);

    return badge;
  }
}

export default App;
