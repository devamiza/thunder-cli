import { createSpinner as initSpinner, Spinner as ISpinner } from 'nanospinner';

export default class Spinner {
  private static spinners = new Map<string, ISpinner>();

  private static getSpinner(tag: string) {
    const spinner = this.spinners.get(tag);
    if (!spinner) throw new Error(`spinner with ${tag} tag didn't found`);

    return spinner;
  }

  public static createSpinner(tag: string, text: string) {
    const spinner = initSpinner(text);
    this.spinners.set(tag, spinner);
    return this;
  }

  public static start(tag: string) {
    return this.getSpinner(tag).start();
  }

  public static success(tag: string) {
    return this.getSpinner(tag).success();
  }

  public static error(tag: string) {
    return this.getSpinner(tag).error();
  }
}
