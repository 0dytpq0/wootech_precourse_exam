import { Console } from '@woowacourse/mission-utils';

export const InputView = {
  async readData(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};
