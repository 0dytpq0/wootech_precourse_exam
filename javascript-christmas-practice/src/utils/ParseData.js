import { InputView } from '../view/index.js';

export const splitString = (string) => {
  const splittedArr = string.split(',');
  return splittedArr;
};
export const parseData = (stringData) => {
  // 정규식 이상하다.
  const regexp = /([가-힣\s]+)-(\d+)/;
  const dataArr = splitString(stringData);

  const data = dataArr.map((data) => {
    const matchData = data.match(regexp);
    if (matchData) {
      // 구조분해 할당으로 하면 한줄
      const [trash, menu, quantity] = matchData;
      return [menu, Number(quantity)];
    }
  });
  return data;
};
