import { Console } from '@woowacourse/mission-utils';
import { parseData } from '../utils/ParseData.js';

export const OutputView = {
  // 수정 필요
  // 파라메터로 true, false를(플래그)주는 방법은 지양하자.(안티패턴);
  printPrompt(prompt, isTrue) {
    isTrue ? Console.print(prompt) : Console.print(`-${prompt}`);
  },

  printMenu(menus) {
    const parsedData = parseData(menus);
    Console.print('<주문 메뉴>');
    parsedData.forEach((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },

  printGiveChampagne(presentationDiscount) {
    presentationDiscount == 25000
      ? Console.print('샴페인 1개')
      : Console.print('없음');
  },

  printBadge(badge) {
    if (badge === 'santa') Console.print('산타');
    if (badge === 'tree') Console.print('나무');
    if (badge === 'star') Console.print('별');
  },

  printAllBenefits(benefitsArr) {
    const keys = {
      christmas: '크리스마스 디데이 할인',
      weekDay: '평일 할인',
      weekend: '주말 할인',
      special: '특별 할인',
      giveEvent: '증정 이벤트',
    };
    Console.print(`${keys.christmas} : -${benefitsArr[0].toLocaleString()}`);
    benefitsArr[1] === 'specialweekday'
      ? (Console.print(
          `${keys.weekDay} : -${(benefitsArr[2] - 1000).toLocaleString()}`
        ),
        Console.print(`${keys.special} : -1,000`))
      : Console.print(
          `${
            benefitsArr === 'weekday' ? '평일 할인' : '주말 할인'
          } : -${benefitsArr[2].toLocaleString()}}`
        );
    Console.print(
      benefitsArr[3] >= 2500
        ? `${keys.giveEvent} : -${benefitsArr[3].toLocaleString()}`
        : ''
    );
  },
};
