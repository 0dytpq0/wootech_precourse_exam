class LottoResult {
  #amount;
  #matchObj;

  constructor(amount, matchObj) {
    this.#amount = amount;
    this.#matchObj = matchObj;
  }

  #calcRevenue(matchObj, matcheAmountObj) {
    let revenue = 0;
    console.log(matchObj);
    Object.entries(matchObj).forEach(([key, value]) => {
      if (value) {
        revenue += matcheAmountObj[key] * value;
      }
    });

    return revenue;
  }

  getRateOfReturn() {
    const matcheAmountObj = {
      three: 5000,
      four: 50000,
      five: 1500000,
      bonus: 30000000,
      six: 2000000000,
    };
    const revenue = this.#calcRevenue(this.#matchObj, matcheAmountObj);
    // utils => 수행하는 역할도 계산밖에 없고 파라미터로 다 받음 되니까 유틸이 어울린다.
    const rateOfReturn = parseFloat(
      (revenue / (this.#amount / 100)).toFixed(1)
    );

    return rateOfReturn;
  }
}

export default LottoResult;
