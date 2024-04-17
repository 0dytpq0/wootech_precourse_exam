export const Validator = {
  validateAmount(amount) {
    validateNumberType(amount);
    if (amount % 1000 !== 0) throw new Error('[ERROR]');
  },

  validatewinningNumber(winningNumber) {
    validateDuplicate(winningNumber);
    validateLottoLength(winningNumber, 6);
    winningNumber.map((number) => {
      validateNumberRange(number);
      validateNumberType(number);
    });
  },

  validateBonusNumber(winningNumber, bonusNumber) {
    const bonusNumList = String(bonusNumber).split(',');
    validateNumberType(bonusNumber);
    validateNumberRange(bonusNumber);
    validateLottoLength(bonusNumList, 1);
    winningNumber.map((number) => {
      if (number === bonusNumber) throw new Error('[ERROR]');
    });
  },
};

const validateNumberType = (number) => {
  const checkStyle = /\D/;

  if (checkStyle.test(number)) throw new Error('[ERROR] 숫자만 입력해 주세요.');
};
const validateLottoLength = (numberList, length) => {
  if (numberList.length !== length) throw new Error('[ERROR]');
};
const validateNumberRange = (number) => {
  if (number < 1 || number > 45) {
    throw new Error('[ERROR] 로또 번호는 1~45의 사잇 값이여야 합니다.');
  }
};
const validateDuplicate = (numberList) => {
  const isDuplicated = new Set(numberList).size !== numberList.length;

  if (isDuplicated) throw new Error('[ERROR]');
};
