import { Console } from "@woowacourse/mission-utils";
import InputView from "./view/InputView.js";
import OutputView from "./view/OutputView.js";
import Game from "./domain/Game.js";

class App {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    try {
      const carNames = await this.#inputView.readCarNames();
      const attempts = await this.#inputView.readAttempts();

      const game = new Game(carNames, attempts);

      this.#outputView.printGameStart();

      for (let i = 0; i < attempts; i++) {
        await game.play();
        this.#outputView.printRoundResult(game.getCurrentPositions());
      }

      this.#outputView.printWinners(game.getWinners());
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
  }
}

export default App;
