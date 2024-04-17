import { Lotto } from '../src/model';

describe('Lotto 클래스 테스트', () => {
  const gerateLottosTestCase = [
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [
        [1, 2, 3, 11, 12, 13],
        [1, 2, 3, 4, 11, 12],
      ],
      { three: 1, four: 1, five: 0, bonus: 0, six: 0 },
    ],
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [
        [1, 2, 3, 4, 7, 13],
        [1, 2, 3, 4, 5, 11],
      ],
      { three: 0, four: 0, five: 1, bonus: 1, six: 0 },
    ],
    [
      [1, 2, 3, 4, 5, 6],
      7,
      [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 7, 11, 12],
      ],
      { three: 0, four: 1, five: 0, bonus: 0, six: 1 },
    ],
  ];

  test.each(gerateLottosTestCase)(
    '금액과 결과 객체에 따라 올바른 수익률을 제공하는지 테스트(%i, %p, %f)',
    (winningNumber, bonusNumber, lottoNumbers, resultObj) => {
      const lotto = new Lotto(winningNumber);
      const matchObj = lotto.updateMatchObj(lottoNumbers, bonusNumber);
      expect(matchObj).toEqual(resultObj);
    }
  );
});
