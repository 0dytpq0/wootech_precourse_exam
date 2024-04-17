import Validator from '../src/domain/Validator.js';

describe('Validator 날짜 유효성 테스트', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  const validateDateTestCase = [['십칠일'], ['0'], ['32'], ['십7']];

  test.each(validateDateTestCase)(
    '날짜에 문자 또는 0보다 작거나 31보다 큰 수가 들어갈 시 에러 발생',
    (date) => {
      expect(() => validator.validateDate(date)).toThrow('[ERROR]');
    }
  );
});

describe('Validator 메뉴 유효성 테스트', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  const menuStringTestCase = [
    '해산물파스타-1,제로콜라+1',
    '티본스테이크-1,티본스테이크-1',
    '나만의비빔밥-1,엄마표비빔밥-1',
  ];

  test.each(menuStringTestCase)('메뉴 문자열 유효성 테스트', (menus) => {
    expect(() => validator.validateMenus(menus)).toThrow('[ERROR]');
  });

  const numberOfOrderTestCase = [
    '해산물파스타-21',
    '해산물파스타-15,제로콜라-6',
    '해산물파스타-0',
  ];

  test.each(numberOfOrderTestCase)('메뉴 주문 수 유효성 테스트', (menus) => {
    expect(() => validator.validateMenus(menus)).toThrow('[ERROR]');
  });

  const onlyDrinkTestCase = [
    '제로콜라-1,레드와인-1,샴페인-1',
    '제로콜라-1,레드와인-1',
    '제로콜라-1,샴페인-1',
    '제로콜라-1',
    '샴페인-1',
    '레드와인-1',
  ];

  test.each(onlyDrinkTestCase)(
    '오직 음료만 주문 했을 시 유효성 테스트',
    (menus) => {
      expect(() => validator.validateMenus(menus)).toThrow('[ERROR]');
    }
  );
});
