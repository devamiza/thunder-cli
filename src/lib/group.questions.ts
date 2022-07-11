import { ConfigAnswer } from '../interfaces/index.js';
import Commander from './commander.js';
import CommanderQuestions from './questions.js';

export default class GroupQuestions {
  public static async start() {
    return new Commander<ConfigAnswer>()
      .addCommand(CommanderQuestions.projectName())
      .addCommand(CommanderQuestions.template())
      .addCommand(CommanderQuestions.linter())
      .addCommand(CommanderQuestions.packageManager())
      .run();
  }
}
