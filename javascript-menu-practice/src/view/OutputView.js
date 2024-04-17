import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printPrompt(prompt) {
    Console.print(prompt + '\n');
  },
  printResult(recommandObj, categories) {
    Console.print('메뉴 추천 결과입니다.');
    Console.print(`[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]`);
    Console.print(`[ 카테고리 | ${categories.join(' | ')}]`);
    Object.entries(recommandObj).forEach(([key, value]) => {
      Console.print(`[ ${key} | ${value.join(' | ')} ]`);
    });
  },
};

export default OutputView;
