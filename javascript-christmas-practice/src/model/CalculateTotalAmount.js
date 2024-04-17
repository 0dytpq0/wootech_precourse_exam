import { parseData } from '../utils/ParseData.js';
import { menuTemplate } from '../constants/event.js';
import { calculateMenuAmount } from '../utils/calculate.js';

class CalculateTotalAmount {
  #menus;

  constructor(menus) {
    this.#menus = menus;
  }

  calculateTotalPurchase() {
    const parsedMenus = parseData(this.#menus);
    const totalPurchase = calculateMenuAmount(parsedMenus, menuTemplate);

    return totalPurchase;
  }

  calculateAfterBenefits(totalDiscount) {
    const totalAfterBenefits = this.calculateTotalPurchase() - totalDiscount;

    return totalAfterBenefits;
  }
}

export default CalculateTotalAmount;
