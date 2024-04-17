const TEMPLATE = Object.freeze({
  menuTemplate: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
    초코케이크: 15000,
    아이스크림: 5000,
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
  mainMenuTemplate: [
    '티본스테이크',
    '바비큐립',
    '해산물파스타',
    '크리스마스파스타',
  ],
  dessertTemplate: ['초코케이크', '아이스크림'],
  nonDrinkTemplate: [
    '양송이수프',
    '타파스',
    '시저샐러드',
    '티본스테이크',
    '바비큐립',
    '해산물파스타',
    '크리스마스파스타',
    '초코케이크',
    '아이스크림',
  ],
});

const DISCOUNT_KEYS = Object.freeze({
  christmas: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  gift: '증정 이벤트',
});

const EVENT_DISCOUNT = Object.freeze({
  minAmountForEvent: 10000,
  christmasDiscount: 100,
  specialDiscount: 1000,
  weekdayDiscount: 2023,
  weekendDiscount: 2023,
  giftBasis: 120000,
  giftDiscount: 25000,
  orderLimit: 20,
});

const DATE = Object.freeze({
  christmas: 25,
  week: 7,
});

const REGULAR_EXPRESSIONS = Object.freeze({
  menuInput: new RegExp(
    /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+-\d+(,[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+-\d+)*$/
  ),
  menuName: new RegExp(/^([ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+)-\d+$/),
  number: new RegExp(/\d+/),
  string: new RegExp(/[a-zA-Z가-힣]/),
});

const CONSTANT = Object.freeze({
  TEMPLATE,
  EVENT_DISCOUNT,
  DISCOUNT_KEYS,
  DATE,
  REGULAR_EXPRESSIONS,
});

export default CONSTANT;
