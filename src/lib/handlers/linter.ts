import Core from '../core';
import PackageManager from './package.manager';

export default class LinterHandler extends Core {
  public static run() {
    const ctx = this.context.get();
    if (!ctx.answers.linter || ctx.answers.linter === 'None') return;

    if (ctx.answers.linter === 'Airbnb') {
      PackageManager.addDependency('devDependencies', ['eslint-config-airbnb-base', 'eslint-config-airbnb-typescript']);
      ctx.config.linter.extends.splice(0, 0, 'airbnb-base');
      ctx.config.linter.extends.splice(1, 0, 'airbnb-typescript/base');
      this.context.set(ctx);
    } else if (ctx.answers.linter === 'Standard') {
      PackageManager.addDependency('devDependencies', [
        'eslint-config-standard',
        'eslint-plugin-promise',
        'eslint-plugin-n',
      ]);
      ctx.config.linter.extends.splice(0, 0, 'standard');
      this.context.set(ctx);
    }

    this.fileManager.write(`${ctx.destination}/.eslintrc.json`, JSON.stringify(ctx.config.linter, null, 2));
  }
}
