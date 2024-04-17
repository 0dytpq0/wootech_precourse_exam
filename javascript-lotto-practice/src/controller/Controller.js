import { GenerateLottos, Lotto, LottoResult } from '../model/index.js';
import { INPUTS, OUTPUTS } from '../view/index.js';
import { Validator } from '../validator/Validator.js';

class Controller {
  #validator;

  constructor() {
    this.#validator = Validator;
  }

  async startLotto() {
    try {
      const amount = await this.#applyAmount();
      const madeLottos = this.#applyMakeLottos(amount);
      const winningNumber = await this.#applyWinningNumber();
      const bonusNumber = await this.#applyBonusNumber(winningNumber);
      const matchObj = this.#applyMatchObj(
        madeLottos,
        winningNumber,
        bonusNumber
      );
      const rateOfReturn = this.#applyRateOfReturn(amount, matchObj);
      this.#applyPrintResult(matchObj, rateOfReturn);
    } catch ({ message }) {
      OUTPUTS.printPrompt(message);
    }
  }

  async #applyAmount() {
    const amount = await INPUTS.inputAmount('구입금액을 입력해 주세요.');
    this.#validator.validateAmount(amount);
    return amount;
  }

  async #applyWinningNumber() {
    const winningNumber =
      await INPUTS.inputWinningNumber('당첨 번호를 입력해 주세요.');
    this.#validator.validatewinningNumber(winningNumber);
    return winningNumber;
  }

  async #applyBonusNumber(winningNumber) {
    const bonusNumber =
      await INPUTS.inputBonusNumber('보너스 번호를 입력해 주세요.');
    this.#validator.validateBonusNumber(winningNumber, bonusNumber);
    return bonusNumber;
  }

  #applyMakeLottos(amount) {
    const generateLottos = new GenerateLottos(amount);
    OUTPUTS.printPrompt(`\n${generateLottos.quantity}개를 구매했습니다.`);
    const madeLottos = generateLottos.makeLottos();
    OUTPUTS.printLottos(madeLottos);
    return madeLottos;
  }

  #applyMatchObj(madeLottos, winningNumbers, bonusNumber) {
    const lotto = new Lotto(winningNumbers);
    const matchObj = lotto.updateMatchObj(madeLottos, bonusNumber);

    return matchObj;
  }

  #applyRateOfReturn(amount, matchObj) {
    const lottoResult = new LottoResult(amount, matchObj);
    const rateOfReturn = lottoResult.getRateOfReturn();

    return rateOfReturn;
  }

  #applyPrintResult(matchObj, rateOfReturn) {
    OUTPUTS.printStatistics(matchObj);
    OUTPUTS.printRateOfReturn(rateOfReturn);
  }
}

export default Controller;
