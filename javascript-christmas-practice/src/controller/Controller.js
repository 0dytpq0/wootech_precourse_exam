import {
  ChristmasDdayEvent,
  PresentationEvent,
  WeekDiscountEvent,
  CalculateTotalAmount,
} from '../model/index.js';
import { InputView, OutputView } from '../view/index.js';

class Controller {
  async applyDate() {
    const date = await InputView.readData(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)'
    );
    return Number(date);
  }

  async applyMenus() {
    const menus = await InputView.readData(
      '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)'
    );

    return menus;
  }

  applyDdayDiscount(date) {
    const christmasDdayEvent = new ChristmasDdayEvent(date);
    const discount = christmasDdayEvent.calculateDdayDiscount();
    discount;
    return discount;
  }

  applyWeekDiscount(date, menus) {
    const weekDiscountEvent = new WeekDiscountEvent(date, menus);
    const [kindOfDiscount, discount] = weekDiscountEvent.getWeekDiscount();

    return [kindOfDiscount, discount];
  }

  applyTotalPurchase(menus) {
    const calculateTotalAmount = new CalculateTotalAmount(menus);
    const totalPurchase = calculateTotalAmount.calculateTotalPurchase();

    return totalPurchase;
  }

  applyAmountAfterBenefits(menus, totalDiscount) {
    const calculateTotalAmount = new CalculateTotalAmount(menus);
    const afterBenefits =
      calculateTotalAmount.calculateAfterBenefits(totalDiscount);

    return afterBenefits;
  }

  applyGiveChampagne(totalPurchase) {
    const presentationEvent = new PresentationEvent(totalPurchase);
    const discount = presentationEvent.giveChampagne();
    return discount;
  }

  applyGiveBadge(totalPurchase, totalDiscount) {
    const presentationEvent = new PresentationEvent(totalPurchase);
    const badge = presentationEvent.giveBadge(totalDiscount);

    return badge;
  }

  printTotalPurchase(totalPurchase) {
    OutputView.printPrompt(`\n<할인 전 총주문 금액>`, true);
    OutputView.printPrompt(`${totalPurchase.toLocaleString()}원`, true);
  }

  printGiveChampagne(discount) {
    OutputView.printPrompt('\n<증정 메뉴>', true);
    OutputView.printGiveChampagne(discount);
  }

  printBenefitsDetail(date, menus) {
    const ddayDiscount = this.applyDdayDiscount(date);
    const [kindOfDiscount, weekDiscount] = this.applyWeekDiscount(date, menus);
    const totalPurchase = this.applyTotalPurchase(menus);
    const giveChampagne = this.applyGiveChampagne(totalPurchase);
    const benefitsArr = [
      ddayDiscount,
      kindOfDiscount,
      weekDiscount,
      giveChampagne,
    ];
    OutputView.printPrompt('\n<혜택 내역>', true);
    OutputView.printAllBenefits(benefitsArr);
  }

  printTotalDiscount(totalDiscount) {
    OutputView.printPrompt(`\n<총혜택 금액>`, true);
    OutputView.printPrompt(`${totalDiscount.toLocaleString()}원`, false);
  }

  printAmountAfterBenefits(totalAfterBenefits) {
    OutputView.printPrompt(`\n<할인 후 예상 결제 금액>`, true);
    OutputView.printPrompt(`${totalAfterBenefits.toLocaleString()}원`, true);
  }

  printKindOfBadge(badge) {
    OutputView.printPrompt('\n<12월 이벤트 배지>', true);
    OutputView.printBadge(badge);
  }
}

export default Controller;
