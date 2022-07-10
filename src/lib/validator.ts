export default class AnswerValidator {
  public static validateChoices(choices: Array<string>, input: string) {
    if (choices.includes(input)) return 'Invalid input.';
    return true;
  }

  public static validateRequiredInput(input: any, message?: string) {
    if (typeof input !== 'string' || input === '') return message || 'Invalid project name';
    return true;
  }
}
