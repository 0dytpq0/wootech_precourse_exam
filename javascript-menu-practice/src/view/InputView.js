import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async getCoaches() {
    const coaches = await Console.readLineAsync(
      '코치의 이름을 입력해 주세요. (, 로 구분)\n'
    );
    Console.print('');
    return coaches.split(',');
  },
  async getCantEatMenu(coach) {
    const menu = await Console.readLineAsync(
      `${coach}(이)가 못 먹는 메뉴를 입력해 주세요.\n`
    );
    Console.print('');

    return menu.split(',');
  },
};

export default InputView;
