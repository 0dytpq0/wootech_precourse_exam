import { MissionUtils } from '@woowacourse/mission-utils';
import Event from '../src/domain/Event.js';
import CONSTANT from '../src/constant/constants.js';

describe('Event', () => {
  let event;

  const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, 'print');
    logSpy.mockClear();

    return logSpy;
  };

  const defaultTestMenu = [
    '티본스테이크-1',
    '바비큐립-1',
    '초코케이크-2',
    '제로콜라-1',
  ];

  beforeEach(() => {
    event = new Event();
  });

  test('getTotal 메서드가 총 주문 가격을 맞게 반환하는지 테스트', () => {
    const menu = [
      '양송이수프-1',
      '타파스-1',
      '시저샐러드-1',
      '티본스테이크-1',
      '바비큐립-1',
      '해산물파스타-1',
      '크리스마스파스타-1',
      '초코케이크-1',
      '아이스크림-1',
      '제로콜라-1',
      '레드와인-1',
      '샴페인-1',
    ];
    const total = event.getTotal(menu);

    expect(total).toBe(296500);
    expect(total).toEqual(expect.any(Number));
  });

  test('getRequestedMenus 메서드가 배열을 올바르게 반환해주는지 테스트', () => {
    const menu = ['양송이수프-1', '시저샐러드-3', '초코케이크-4'];

    expect(event.getRequestedMenus(menu)).toStrictEqual([
      '양송이수프 1개',
      '시저샐러드 3개',
      '초코케이크 4개',
    ]);
    expect(event.getRequestedMenus(menu)).toBeInstanceOf(Array);
  });

  test('applyGiveBadge 메서드가 금액에 따라 제대로된 출력을 해주는지 테스트', () => {
    const total = [0, 5000, 10000, 20000];

    total.forEach((value) => {
      const logSpy = getLogSpy();
      let expected = '없음';
      switch (value) {
        case value >= 20000:
          expected = '산타';
          break;
        case value >= 10000:
          expected = '트리';
          break;
        case value >= 5000:
          expected = '별';
          break;
      }

      event.applyGiveBadge(total);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
    });
  });

  const christmasTestCases = [
    [26, defaultTestMenu, 0],
    [14, defaultTestMenu, 2300],
  ];

  test.each(christmasTestCases)(
    '크리스마스 할인이 조건에 맞게 적용되는지 테스트 (%s, %p, %i)',
    (date, menus, expectedChristmasDiscount) => {
      const DiscountObj = event.applyBenefitsDetails(date, menus);
      const expectedDiscount = {
        [CONSTANT.DISCOUNT_KEYS.christmas]: expectedChristmasDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekday]: 4046,
        [CONSTANT.DISCOUNT_KEYS.weekend]: 0,
        [CONSTANT.DISCOUNT_KEYS.special]: 0,
        [CONSTANT.DISCOUNT_KEYS.gift]: 25000,
      };

      expect(DiscountObj).toStrictEqual(expectedDiscount);
    }
  );

  const weekdayTestCases = [
    [1, defaultTestMenu, 1000, 0, 4046],
    [4, defaultTestMenu, 1300, 4046, 0],
  ];

  test.each(weekdayTestCases)(
    '평일 할인이 조건에 맞게 적용되는지 테스트 (%s, %p, %i, %i, %i)',
    (
      date,
      menus,
      expectedChristmasDiscount,
      expectedWeekdayDiscount,
      expectedWeekendDiscount
    ) => {
      const DiscountObj = event.applyBenefitsDetails(date, menus);
      const expectedDiscount = {
        [CONSTANT.DISCOUNT_KEYS.christmas]: expectedChristmasDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekday]: expectedWeekdayDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekend]: expectedWeekendDiscount,
        [CONSTANT.DISCOUNT_KEYS.special]: 0,
        [CONSTANT.DISCOUNT_KEYS.gift]: 25000,
      };

      expect(DiscountObj).toStrictEqual(expectedDiscount);
    }
  );

  const weekendTestCases = [
    [15, defaultTestMenu, 2400, 0, 4046],
    [4, defaultTestMenu, 1300, 4046, 0],
  ];

  test.each(weekendTestCases)(
    '주말 할인이 조건에 맞게 적용되는지 테스트 (%s, %p, %i, %i, %i)',
    (
      date,
      menus,
      expectedChristmasDiscount,
      expectedWeekdayDiscount,
      expectedWeekendDiscount
    ) => {
      const DiscountObj = event.applyBenefitsDetails(date, menus);
      const expectedDiscount = {
        [CONSTANT.DISCOUNT_KEYS.christmas]: expectedChristmasDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekday]: expectedWeekdayDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekend]: expectedWeekendDiscount,
        [CONSTANT.DISCOUNT_KEYS.special]: 0,
        [CONSTANT.DISCOUNT_KEYS.gift]: 25000,
      };

      expect(DiscountObj).toStrictEqual(expectedDiscount);
    }
  );

  const specialTestCases = [
    [3, defaultTestMenu, 1200, 4046, 0, 1000],
    [4, defaultTestMenu, 1300, 4046, 0, 0],
    [25, defaultTestMenu, 3400, 4046, 0, 1000],
  ];

  test.each(specialTestCases)(
    '특별 할인이 조건에 맞게 적용되는지 테스트 (%s, %p, %i, %i, %i, %i)',
    (
      date,
      menus,
      expectedChristmasDiscount,
      expectedWeekdayDiscount,
      expectedWeekendDiscount,
      expectedSpecialDiscount
    ) => {
      const DiscountObj = event.applyBenefitsDetails(date, menus);
      const expectedDiscount = {
        [CONSTANT.DISCOUNT_KEYS.christmas]: expectedChristmasDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekday]: expectedWeekdayDiscount,
        [CONSTANT.DISCOUNT_KEYS.weekend]: expectedWeekendDiscount,
        [CONSTANT.DISCOUNT_KEYS.special]: expectedSpecialDiscount,
        [CONSTANT.DISCOUNT_KEYS.gift]: 25000,
      };

      expect(DiscountObj).toStrictEqual(expectedDiscount);
    }
  );

  test('applyBenefitsDetails 메서드가 제공 받은 혜택에 대한 객체를 제대로 반환해주는지 테스트', () => {
    const discountParams = [
      '3',
      [
        '양송이수프-1',
        '타파스-1',
        '티본스테이크-1',
        '바비큐립-1',
        '초코케이크-1',
        '제로콜라-1',
      ],
    ];
    const discountExpected = {
      [CONSTANT.DISCOUNT_KEYS.christmas]: 1200,
      [CONSTANT.DISCOUNT_KEYS.weekday]: 2023,
      [CONSTANT.DISCOUNT_KEYS.weekend]: 0,
      [CONSTANT.DISCOUNT_KEYS.special]: 1000,
      [CONSTANT.DISCOUNT_KEYS.gift]: 25000,
    };
    const undiscountExpected = {
      [CONSTANT.DISCOUNT_KEYS.christmas]: 0,
      [CONSTANT.DISCOUNT_KEYS.weekday]: 0,
      [CONSTANT.DISCOUNT_KEYS.weekend]: 0,
      [CONSTANT.DISCOUNT_KEYS.special]: 0,
      [CONSTANT.DISCOUNT_KEYS.gift]: 0,
    };
    const undiscountParams = ['20', ['타파스-1', '제로콜라-1']];

    // 10000원 이상 구매 시 특별 할인 평일 날에 받을 수 있는 혜택이 제대로 반환 되는지 테스트.
    expect(
      event.applyBenefitsDetails(discountParams[0], discountParams[1])
    ).toStrictEqual(discountExpected);

    // 10000원 이하 구매에 대한 테스트
    expect(
      event.applyBenefitsDetails(undiscountParams[0], undiscountParams[1])
    ).toStrictEqual(undiscountExpected);
  });

  const totalDiscountTestCase = [
    ['4', defaultTestMenu, 30346],
    ['3', defaultTestMenu, 31246],
    ['8', defaultTestMenu, 30746],
    ['25', defaultTestMenu, 32446],
    ['27', defaultTestMenu, 29046],
  ];

  test.each(totalDiscountTestCase)(
    '총혜택 금액이 제대로 반환되는지 테스트 (%s, %p, %i)',
    (date, menus, expectedTotalDiscount) => {
      const totalDiscount = event.applyTotalDiscount(date, menus);

      expect(totalDiscount).toStrictEqual(expectedTotalDiscount);
    }
  );

  const paymentAmountTestCase = [
    ['4', defaultTestMenu, 136654],
    ['3', defaultTestMenu, 135754],
    ['8', defaultTestMenu, 136254],
    ['25', defaultTestMenu, 134554],
    ['27', defaultTestMenu, 137954],
  ];

  test.each(paymentAmountTestCase)(
    '할인 후 예상 결제 금액이 제대로 테스트 (%s, %p, %i)',
    (date, menus, expectedTotalPaymentAmount) => {
      const totalpaymentAmount = event.applyPaymentAmount(date, menus);

      expect(totalpaymentAmount).toStrictEqual(expectedTotalPaymentAmount);
    }
  );
});
