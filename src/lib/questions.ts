import inquirer from 'inquirer';
import { ConfigAnswer } from '../interfaces';
import FileManager from './file.manager';
import Utility from './utility';
import AnswerValidator from './validator';

export default class CommanderQuestions {
  public static linter(): inquirer.QuestionCollection<ConfigAnswer> {
    const choices: ConfigAnswer['linter'][] = ['None', 'Airbnb', 'Standard'];
    return {
      name: 'linter',
      type: 'list',
      message: 'Linter config:',
      choices,
      validate: (i) => AnswerValidator.validateChoices(choices, i),
    };
  }

  public static packageManager(): inquirer.QuestionCollection<ConfigAnswer> {
    const choices: ConfigAnswer['packageManager'][] = ['yarn', 'npm', 'pnpm'];
    return {
      name: 'packageManager',
      type: 'list',
      message: 'Select package manager:',
      choices,
      validate: (i) => AnswerValidator.validateChoices(choices, i),
    };
  }

  public static projectName(): inquirer.QuestionCollection<ConfigAnswer> {
    return {
      name: 'projectName',
      type: 'input',
      message: "What's your project name ?",
      filter: (i) => Utility.toValidPackageName(i),
      validate: (i) => {
        const isValid = AnswerValidator.validateRequiredInput(i, 'Invalid project name.');
        if (typeof isValid === 'string') return isValid;

        const dirExistence = FileManager.isDirExists(i);
        if (dirExistence) return `Directory "${i}" already exists, please choose another name. `;

        return true;
      },
    };
  }

  public static template(): inquirer.QuestionCollection<ConfigAnswer> {
    const choices: ConfigAnswer['template'][] = ['Starter'];
    return {
      name: 'template',
      type: 'list',
      message: 'Select project template:',
      choices,
      validate: (i) => AnswerValidator.validateChoices(choices, i),
    };
  }
}
