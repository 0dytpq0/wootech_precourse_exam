import { Console } from '@woowacourse/mission-utils';
import MESSAGE from '../constant/message.js';
import CONSTANT from '../constant/constants.js';

const OutputView = {
  printMenu(str, menus) {
    const menuText = menus.join('\n');

    Console.print(`${str}\n${menuText}`);
  },
  printAmount(str, amount) {
    const isTrue = str === MESSAGE.OUTPUT_MESSAGE.totalBenefitAmount;

    MESSAGE.OUTPUT_MESSAGE.amount(isTrue, str, amount);
  },
  printGiftMenu(total) {
    const isTrue = total > CONSTANT.EVENT_DISCOUNT.giftBasis;

    MESSAGE.OUTPUT_MESSAGE.giftMenu(isTrue);
  },
  printBenefits(obj) {
    const benefitObj = Object.entries(obj).filter(([key, value]) => value > 0);
    const isTrue = benefitObj.length > 0;

    MESSAGE.OUTPUT_MESSAGE.benefits(isTrue, benefitObj);
  },
  printBadge(total) {
    MESSAGE.OUTPUT_MESSAGE.badge(total);
  },
  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
