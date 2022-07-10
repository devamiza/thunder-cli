import { readFileSync, writeFileSync } from 'fs';
import Core from './core';
import { ConfigAnswer, DirFilesReturn, HandlerInput } from '../interfaces';
import TemplateRender from './template.render';
import Utility from './utility';
import PackageManager from './handlers/package.manager';
import GitHandler from './handlers/git';
import LinterHandler from './handlers/linter';
import GroupQuestions from './group.questions';

export default class Bootstrap extends Core {
  public static async pre() {
    this.welcomeMessage();
    const answers = await GroupQuestions.start();
    return { answers };
  }

  public static async main(data: { answers: ConfigAnswer }) {
    const ctx = this.context.setRenderData(data.answers);

    this.fileManager.copy(ctx.templatePath, ctx.destination);
    const files = this.fileManager.getDirFiles(ctx.destination, { recursive: true });
    ctx.files = files;
    this.context.set(ctx);

    this.handlingRenderData(ctx.files, {
      projectName: ctx.answers.projectName,
    });

    GitHandler.run();
    LinterHandler.run();
    PackageManager.install();
  }

  public static post() {
    this.sayGoodbye();
  }

  private static sayGoodbye() {
    const ctx = this.context.get();
    console.log(`🚀 Project "${ctx.answers.projectName}" successfully created.`);
  }

  private static welcomeMessage() {
    console.log(Utility.getLogoText());
    console.log('Welcome to thunder cli, enjoy with your saved time. \n');
  }

  private static handlingRenderData(files: DirFilesReturn, renderData: HandlerInput) {
    const ctx = this.context.get();
    const renderFiles = files.filter((i) => ctx.config.render.includes(i.name));
    for (const file of renderFiles) {
      const body = readFileSync(file.path, { encoding: 'utf-8' }).toString();
      const renderedBody = TemplateRender.render(body, renderData);

      const formatted = Utility.formatCode(renderedBody);

      writeFileSync(file.path, formatted);
    }
  }
}
