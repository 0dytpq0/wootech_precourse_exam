import { Random, Console } from '@woowacourse/mission-utils';
//lotto matching
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  #initializeMatchObj() {
    const matchTypes = ['three', 'four', 'five', 'bonus', 'six'];
    const matchObj = matchTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    return matchObj;
  }

  // winning <- 내 속성에 있음 ㅇㅇ
  #countMatchingNumbers(lottoNumbers, winningNumbers) {
    const matchCount = lottoNumbers.filter((lotto) =>
      winningNumbers.includes(lotto)
    ).length;

    return matchCount;
  }

  #isBonusNumberMatched(lotto, bonusNumber) {
    return lotto.includes(bonusNumber);
  }

  // return이 필요가 없다.
  #isMatch(matchObj, count, lotto, bonusNumber) {
    if (count === 3) return (matchObj.three += 1);
    if (count === 4) return (matchObj.four += 1);
    if (count === 5)
      this.#isBonusNumberMatched(lotto, bonusNumber)
        ? (matchObj.bonus += 1)
        : (matchObj.five += 1);
    if (count === 6) return (matchObj.six += 1);
  }

  updateMatchObj(lottoNumbers, bonusNumber) {
    const matchObj = this.#initializeMatchObj();
    lottoNumbers.forEach((lotto) => {
      const count = this.#isBonusNumberMatched(lotto, bonusNumber)
        ? this.#countMatchingNumbers(lotto, this.#numbers) + 1
        : this.#countMatchingNumbers(lotto, this.#numbers);

      this.#isMatch(matchObj, count, lotto, bonusNumber);
    });

    return matchObj;
  }
}

export default Lotto;
