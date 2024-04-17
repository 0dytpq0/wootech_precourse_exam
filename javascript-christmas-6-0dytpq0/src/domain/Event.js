import OutputView from '../ui/OutputView.js';
import Validator from './Validator.js';
import CONSTANT from '../constant/constants.js';

class Event {
  /**
   * 입력받은 메뉴 문자열에서 메뉴 이름만 반환한다.
   * @param {string} menu
   * @returns {string} menuName[1]
   */
  #getMenuName(menu) {
    const menuName = menu.match(CONSTANT.REGULAR_EXPRESSIONS.menuName);
    return menuName[1];
  }
  /**
   * 입력받은 메뉴 문자열에서 주문 수만 반환한다.
   * @param {string} menu
   * @returns {string} numberOfOrder[0]
   */
  #getNumberOfOrder(menu) {
    const numberOfOrder = menu.match(CONSTANT.REGULAR_EXPRESSIONS.number);
    return numberOfOrder[0];
  }

  getTotal(menus) {
    let totalAmount = 0;
    menus.forEach((menu) => {
      totalAmount +=
        CONSTANT.TEMPLATE.menuTemplate[this.#getMenuName(menu)] *
        Number(this.#getNumberOfOrder(menu));
    });

    return totalAmount;
  }

  getRequestedMenus(menus) {
    const menuArr = Array.from(
      menus,
      (menu) => `${this.#getMenuName(menu)} ${this.#getNumberOfOrder(menu)}개`
    );
    return menuArr;
  }

  #isDiscountValid(menus, originDiscount) {
    const validator = new Validator();
    if (!validator.validateAmount(this.getTotal(menus))) {
      return 0;
    }
    return originDiscount;
  }

  #calcChristmasDiscount(date, originDiscount) {
    let discount = originDiscount;
    if (date <= CONSTANT.DATE.christmas) {
      for (let days = 2; days <= date; days++) {
        discount += CONSTANT.EVENT_DISCOUNT.christmasDiscount;
      }
      return discount;
    }
  }

  #isChrismasDiscountValid(date, menus, originDiscount) {
    const validator = new Validator();
    let discount = originDiscount;
    if (
      date > CONSTANT.DATE.christmas ||
      !validator.validateAmount(this.getTotal(menus))
    ) {
      return 0;
    }
    return discount;
  }
  /**
   * 크리스마스 디데이 할인 적용 여부를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discount
   */
  #applyChristmasDiscount(date, menus) {
    let discount = 1000;
    discount = this.#calcChristmasDiscount(date, discount);
    discount = this.#isChrismasDiscountValid(date, menus, discount);
    return discount;
  }

  #calcWeekdayDiscount(menus, originDiscount) {
    let discount = originDiscount;
    menus.forEach((menu) => {
      CONSTANT.TEMPLATE.dessertTemplate.includes(this.#getMenuName(menu))
        ? (discount +=
            CONSTANT.EVENT_DISCOUNT.weekdayDiscount *
            Number(this.#getNumberOfOrder(menu)))
        : null;
    });
    return discount;
  }

  #isWeekday(date, menus, originDiscount) {
    let discount = originDiscount;
    if (date % CONSTANT.DATE.week !== 1 && date % CONSTANT.DATE.week !== 2) {
      return this.#calcWeekdayDiscount(menus, discount);
    }
    return originDiscount;
  }
  /**
   * 평일 할인 적용 여부를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discount
   */
  #applyWeekdayDiscount(date, menus) {
    let discount = 0;
    discount = this.#isWeekday(date, menus, discount);
    discount = this.#isDiscountValid(menus, discount);

    return discount;
  }

  #calcWeekendDiscount(menus, originDiscount) {
    let discount = originDiscount;
    menus.forEach((menu) => {
      CONSTANT.TEMPLATE.mainMenuTemplate.includes(this.#getMenuName(menu))
        ? (discount +=
            CONSTANT.EVENT_DISCOUNT.weekendDiscount *
            Number(this.#getNumberOfOrder(menu)))
        : null;
    });
    return discount;
  }

  #isWeekend(date, menus, originDiscount) {
    let discount = originDiscount;

    if (date % CONSTANT.DATE.week === 1 || date % CONSTANT.DATE.week === 2) {
      return this.#calcWeekendDiscount(menus, discount);
    }
    return originDiscount;
  }
  /**
   * 주말 할인 적용 여부를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discount
   */
  #applyWeekendDiscount(date, menus) {
    let discount = 0;

    discount = this.#isWeekend(date, menus, discount);
    discount = this.#isDiscountValid(menus, discount);

    return discount;
  }

  #calcSpecialDiscount(date, originDiscount) {
    let discount = originDiscount;
    if (date % CONSTANT.DATE.week === 3) {
      return (discount += CONSTANT.EVENT_DISCOUNT.specialDiscount);
    }

    if (date === CONSTANT.DATE.christmas) {
      return (discount += CONSTANT.EVENT_DISCOUNT.specialDiscount);
    }

    return originDiscount;
  }
  /**
   * 특별 할인 적용 여부를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discount
   */
  #applySpecialDiscount(date, menus) {
    let discount = 0;
    discount = this.#calcSpecialDiscount(date, discount);
    discount = this.#isDiscountValid(menus, discount);
    return discount;
  }

  #isGiftEvent(total, originDiscount) {
    let discount = originDiscount;

    total > CONSTANT.EVENT_DISCOUNT.giftBasis
      ? (discount += CONSTANT.EVENT_DISCOUNT.giftDiscount)
      : null;

    return discount;
  }

  /**
   * 증정 이벤트 적용 여부를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discount
   */
  #applyGiftEvent(total, menus) {
    let discount = 0;

    discount = this.#isGiftEvent(total, discount);
    discount = this.#isDiscountValid(menus, discount);

    return discount;
  }

  #isGiveBadgeValid(total) {
    const validator = new Validator();
    return validator.validateAmount(total);
  }
  /**
   * 뱃지 증정 여부를 검사한 후 출력을 요청한다.
   * @param {number} total
   */
  applyGiveBadge(total) {
    this.#isGiveBadgeValid(total)
      ? OutputView.printBadge(total)
      : OutputView.printBadge(0);
  }

  /**
   * 적용된 혜택에 대한 정보가 들어있는 객체를 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {object} benefitsObj
   */
  applyBenefitsDetails(date, menus) {
    const totalAmount = this.getTotal(menus);
    const benefitsObj = {
      // prettier-ignore
      [CONSTANT.DISCOUNT_KEYS.christmas]: this.#applyChristmasDiscount(date,menus),
      [CONSTANT.DISCOUNT_KEYS.weekday]: this.#applyWeekdayDiscount(date, menus),
      [CONSTANT.DISCOUNT_KEYS.weekend]: this.#applyWeekendDiscount(date, menus),
      [CONSTANT.DISCOUNT_KEYS.special]: this.#applySpecialDiscount(date, menus),
      [CONSTANT.DISCOUNT_KEYS.gift]: this.#applyGiftEvent(totalAmount, menus),
    };

    return benefitsObj;
  }

  /**
   * 총혜택 금액을 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} totalDiscount
   */
  applyTotalDiscount(date, menus) {
    const totalDiscount =
      this.#applyChristmasDiscount(date, menus) +
      this.#applyWeekdayDiscount(date, menus) +
      this.#applyWeekendDiscount(date, menus) +
      this.#applySpecialDiscount(date, menus) +
      this.#applyGiftEvent(this.getTotal(menus), menus);
    return totalDiscount;
  }

  /**
   * 할인 후 예상 결제 금액을 반환한다.
   * @param {number} date
   * @param {string[]} menus
   * @returns {number} discountTotal
   */
  applyPaymentAmount(date, menus) {
    const discount =
      this.#applyChristmasDiscount(date, menus) +
      this.#applyWeekdayDiscount(date, menus) +
      this.#applySpecialDiscount(date, menus) +
      this.#applyWeekendDiscount(date, menus);
    const discountTotal = this.getTotal(menus) - discount;

    return discountTotal;
  }
}

export default Event;
