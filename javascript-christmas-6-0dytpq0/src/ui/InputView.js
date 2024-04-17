import { Console } from '@woowacourse/mission-utils';
import MESSAGE from '../constant/message.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_MESSAGE.date);

    return input;
  },
  async readMenu() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_MESSAGE.menu);

    return input;
  },
};

export default InputView;
