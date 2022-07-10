import { ConfigAnswer } from '../interfaces';
import Commander from './commander';
import CommanderQuestions from './questions';

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
