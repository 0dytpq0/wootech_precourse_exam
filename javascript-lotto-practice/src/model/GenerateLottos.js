import { Random } from '@woowacourse/mission-utils';
import { OUTPUTS } from '../view/index.js';
import { sortArray } from '../utils/sortArray.js';

class GenerateLottos {
  #amount;

  constructor(amount) {
    this.#amount = amount;
  }
  // get => 사이드 이펙트 쓰지마!
  get quantity() {
    return this.#amount / 1000;
  }

  #makeLottoArray(quantity) {
    const lottosArr = Array.from({ length: quantity }, () => {
      const lottosNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      // 얘는 원래 숫자다
      lottosNumber.forEach((number) => {
        Number(number);
      });

      return sortArray(lottosNumber);
    });
    return lottosArr;
  }

  makeLottos() {
    const myLottos = this.#makeLottoArray(this.quantity);

    return myLottos;
  }
}

export default GenerateLottos;
