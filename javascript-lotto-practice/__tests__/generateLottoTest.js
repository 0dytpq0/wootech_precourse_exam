import { MissionUtils } from '@woowacourse/mission-utils';
import { GenerateLottos, Lotto, LottoResult } from '../src/model';

describe('GenerateLottos 클래스 테스트', () => {
  const gerateLottosTestCase = [[5000], [10000], [50000]];

  test.each(gerateLottosTestCase)(
    '금액에 따라 맞는 갯수의 로또를 생성해주는지 테스트(%i)',
    (amount) => {
      const generateLottos = new GenerateLottos(amount);
      const madeLottos = generateLottos.makeLottos();
      expect(madeLottos.length).toBe(amount / 1000);
    }
  );
});
