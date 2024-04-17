import { Console } from '@woowacourse/mission-utils';

const INPUT_MESSAGE = Object.freeze({
  date: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  menu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

const OUTPUT_MESSAGE = Object.freeze({
  eventPreview: (date) => {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`
    );
  },
  amount: (isTrue, str, amount) => {
    isTrue
      ? Console.print(
          `\n${str}\n${amount > 0 ? '-' : ''}${amount.toLocaleString()}원`
        )
      : Console.print(`\n${str}\n${amount.toLocaleString()}원`);
  },
  giftMenu: (isTrue) => {
    isTrue
      ? Console.print(`\n<증정 메뉴>\n샴페인 1개`)
      : Console.print('\n<증정 메뉴>\n없음');
  },
  benefits: (isTrue, benefitObj) => {
    Console.print('\n<혜택 내역>');

    isTrue
      ? benefitObj.forEach(([key, value]) => {
          Console.print(`${key}: -${value.toLocaleString()}`);
        })
      : Console.print('없음');
  },
  badge: (total) => {
    if (total >= 20000) return Console.print('\n<12월 이벤트 배지>\n산타');
    if (total >= 10000) return Console.print('\n<12월 이벤트 배지>\n트리');
    if (total >= 5000) return Console.print('\n<12월 이벤트 배지>\n별');

    Console.print('\n<12월 이벤트 배지>\n없음');
  },
  orderMenu: '<주문 메뉴>',
  amountBeforeDiscount: '<할인 전 총주문 금액>',
  totalBenefitAmount: '<총혜택 금액>',
  paymentAmount: '<할인 후 예상 결제 금액>',
});

const ERROR_MESSAGE = Object.freeze({
  date: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  menu: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const MESSAGE = Object.freeze({ INPUT_MESSAGE, OUTPUT_MESSAGE, ERROR_MESSAGE });

export default MESSAGE;
