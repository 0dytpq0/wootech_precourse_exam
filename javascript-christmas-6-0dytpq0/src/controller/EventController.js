import MESSAGE from '../constant/message.js';

class EventController {
  #event;
  #validator;
  #inputView;
  #outputView;

  constructor(event, validator, inputView, outputView) {
    this.#event = event;
    this.#validator = validator;
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async startReservation() {
    const date = Number(await this.requestValidDate());
    const menus = await this.requestValidMenus();
    MESSAGE.OUTPUT_MESSAGE.eventPreview(date);
    this.printMenus(menus);
    this.printTotalAmount(menus);
    this.printGift(menus);
    this.printBenefitsDetails(date, menus);
    this.printTotalDiscount(date, menus);
    this.printPaymentAmount(date, menus);
    this.printBadge(menus);
  }

  async requestValidDate() {
    while (true) {
      try {
        const date = await this.#inputView.readDate();
        this.#validator.validateDate(date);

        return date;
      } catch ({ message }) {
        this.#outputView.printError(message);
      }
    }
  }

  async requestValidMenus() {
    while (true) {
      try {
        const menus = await this.#inputView.readMenu();
        this.#validator.validateMenus(menus);

        return menus.split(',');
      } catch ({ message }) {
        this.#outputView.printError(message);
      }
    }
  }

  printMenus(menus) {
    const menusArr = this.#event.getRequestedMenus(menus);
    this.#outputView.printMenu(MESSAGE.OUTPUT_MESSAGE.orderMenu, menusArr);
  }

  printTotalAmount(menus) {
    const totalAmount = this.#event.getTotal(menus);
    this.#outputView.printAmount(
      MESSAGE.OUTPUT_MESSAGE.amountBeforeDiscount,
      totalAmount
    );
  }

  printGift(menus) {
    const totalAmount = this.#event.getTotal(menus);
    this.#outputView.printGiftMenu(totalAmount);
  }

  printBenefitsDetails(date, menus) {
    const benefitsObj = this.#event.applyBenefitsDetails(date, menus);
    this.#outputView.printBenefits(benefitsObj);
  }

  printTotalDiscount(date, menus) {
    const totalDiscount = this.#event.applyTotalDiscount(date, menus);
    this.#outputView.printAmount(
      MESSAGE.OUTPUT_MESSAGE.totalBenefitAmount,
      totalDiscount
    );
  }

  printPaymentAmount(date, menus) {
    const paymentAmount = this.#event.applyPaymentAmount(date, menus);
    this.#outputView.printAmount(
      MESSAGE.OUTPUT_MESSAGE.paymentAmount,
      paymentAmount
    );
  }

  printBadge(menus) {
    const totalAmount = this.#event.getTotal(menus);
    this.#event.applyGiveBadge(totalAmount);
  }
}

export default EventController;
