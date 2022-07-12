import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { ConfigAnswer, Template, Context as IContext } from '../../interfaces/index.js';
import Utility from '../utility.js';

export default class Context {
  private static instance: Context | undefined;

  private renderData: ConfigAnswer | undefined;

  private context: IContext | undefined;

  protected constructor() {}

  public static getContextInstance() {
    if (!this.instance) this.instance = new Context();
    return this.instance;
  }

  public setRenderData(renderData: ConfigAnswer) {
    this.renderData = renderData;
    return this.get();
  }

  public get(): IContext {
    if (!this.renderData) throw new Error('Should set render data before calling getContext.');
    if (!this.context) {
      const destination = this.getDestination(this.renderData.projectName);
      const templatePath = this.getTemplatePath(this.renderData.template);
      const config = JSON.parse(readFileSync(join(templatePath, 'thunder.config.json'), { encoding: 'utf-8' }));

      this.context = {
        destination,
        config,
        templatePath,
        files: [],
        answers: this.renderData,
      };
    }

    return this.context;
  }

  public set(ctx: IContext) {
    this.context = ctx;
  }

  private getDestination(projectName: string) {
    return resolve(process.cwd(), projectName);
  }

  private getTemplatePath(template: Template) {
    let basePath = join(Utility.dirname(import.meta), '../../../template');
    switch (template) {
      case 'Starter':
        basePath = join(basePath, 'starter');
        break;

      default:
        throw new Error('Not implemented yet.');
    }
    return basePath;
  }
}
