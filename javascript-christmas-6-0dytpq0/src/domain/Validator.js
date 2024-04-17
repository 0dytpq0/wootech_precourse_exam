import CONSTANT from '../constant/constants.js';
import MESSAGE from '../constant/message.js';

class Validator {
  // 입력받은 날짜에 대한 유효성 검증
  validateDate(date) {
    if (!CONSTANT.REGULAR_EXPRESSIONS.number.test(date)) {
      throw new Error(MESSAGE.ERROR_MESSAGE.date);
    }
    if (CONSTANT.REGULAR_EXPRESSIONS.string.test(date)) {
      throw new Error(MESSAGE.ERROR_MESSAGE.date);
    }
    if (Number(date) < 1 || Number(date) > 31) {
      throw new Error(MESSAGE.ERROR_MESSAGE.date);
    }
  }

  // 입력받은 메뉴에 대한 유효성 검증
  validateMenus(menus) {
    const menusArr = menus.split(',');

    this.#validateMenuInput(menus);
    this.#validateDuplicate(menusArr);
    this.#validateIncludedMenu(menusArr);
    this.#validateIsOnlyDrink(menusArr);
    this.#validateNumberOfOrderCount(menusArr);
  }
  // 주문 금액이 10000원 이상인지 검증
  validateAmount(amount) {
    if (amount >= CONSTANT.EVENT_DISCOUNT.minAmountForEvent) return true;
    return false;
  }

  #validateMenuInput(menus) {
    if (!CONSTANT.REGULAR_EXPRESSIONS.menuInput.test(menus)) {
      throw new Error(MESSAGE.ERROR_MESSAGE.menu);
    }
  }

  #validateDuplicate(menusArr) {
    if (new Set(menusArr).size !== menusArr.length) {
      throw new Error(MESSAGE.ERROR_MESSAGE.menu);
    }
  }

  #validateIncludedMenu(menusArr) {
    const menuTempletKeys = Object.keys(CONSTANT.TEMPLATE.menuTemplate);
    menusArr.map((menu) => {
      const menuName = menu.match(CONSTANT.REGULAR_EXPRESSIONS.menuName);
      if (!menuTempletKeys.includes(menuName[1])) {
        throw new Error(MESSAGE.ERROR_MESSAGE.menu);
      }
    });
  }

  // 음료만 주문 했는지에 대해 검증
  #validateIsOnlyDrink(menusArr) {
    let menuCount = 0;
    menusArr.map((menu) => {
      const menuName = menu.match(CONSTANT.REGULAR_EXPRESSIONS.menuName);
      if (CONSTANT.TEMPLATE.nonDrinkTemplate.includes(menuName[1])) {
        menuCount += 1;
      }
    });

    if (menuCount === 0) throw new Error(MESSAGE.ERROR_MESSAGE.menu);
  }

  #validateNumberOfOrder(numberOfOrder) {
    if (Number(numberOfOrder) <= 0) {
      throw new Error(MESSAGE.ERROR_MESSAGE.menu);
    }
  }

  // 주문 수가 20을 넘어가는 지에 대해 검증
  #validateNumberOfOrderCount(menusArr) {
    let menuOrders = 0;
    menusArr.map((menu) => {
      const numberOfOrder = menu.match(CONSTANT.REGULAR_EXPRESSIONS.number);
      menuOrders += Number(numberOfOrder[0]);
      this.#validateNumberOfOrder(Number(numberOfOrder[0]));
    });
    if (menuOrders > CONSTANT.EVENT_DISCOUNT.orderLimit)
      throw new Error(MESSAGE.ERROR_MESSAGE.menu);
  }
}
export default Validator;
