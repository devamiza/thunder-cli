import inquirer from 'inquirer';

export default class Commander<T> {
  private prompts: inquirer.QuestionCollection<T>[] = [];

  public addCommand(prompt: inquirer.QuestionCollection<T>) {
    this.prompts.push(prompt);
    return this;
  }

  public run() {
    return inquirer.prompt(this.prompts);
  }
}
