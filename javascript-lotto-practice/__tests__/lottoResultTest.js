import { GenerateLottos, Lotto, LottoResult } from '../src/model';

describe('LottoResult 클래스 테스트', () => {
  const gerateLottosTestCase = [
    [8000, { three: 1, four: 0, five: 0, bonus: 0, six: 0 }, 62.5],
    [40000, { three: 0, four: 1, five: 0, bonus: 1, six: 0 }, 75125],
    [1000000, { three: 0, four: 0, five: 1, bonus: 0, six: 1 }, 200150],
  ];

  test.each(gerateLottosTestCase)(
    '금액과 결과 객체에 따라 올바른 수익률을 제공하는지 테스트(%i, %p, %f)',
    (amount, matchObj, rate) => {
      const lottoResult = new LottoResult(amount, matchObj);
      const rateOfReturn = lottoResult.getRateOfReturn();
      expect(rateOfReturn).toBe(rate);
    }
  );
});
