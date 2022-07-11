import { execSync } from 'child_process';
import { PackageJsonDependencyTypes } from '../../interfaces/index.js';
import Core from '../core/index.js';
import Spinner from '../spinner.js';

export default class PackageManager extends Core {
  public static install() {
    const ctx = this.context.get();
    const spinnerTag = 'INSTALL_DEPENDENCIES';

    ctx.config.packageJson.name = ctx.answers.projectName;
    this.fileManager.write(`${ctx.destination}/package.json`, JSON.stringify(ctx.config.packageJson, null, 2));

    try {
      Spinner.createSpinner(spinnerTag, 'Installing dependencies.').start(spinnerTag);
      execSync(`${ctx.answers.packageManager} install`, { cwd: ctx.destination });
      Spinner.success(spinnerTag);
    } catch (error) {
      Spinner.error(spinnerTag);
      const errorMsg = error instanceof Error ? error.message : 'Installing dependencies failed.';
      console.error(error);
      if (error instanceof Error) throw new Error(errorMsg);
    }
  }

  public static addDependency(scope: PackageJsonDependencyTypes, dependencies: string[]) {
    const ctx = this.context.get();

    dependencies.forEach((k) => {
      ctx.config.packageJson[scope][k] = 'latest';
    });

    this.context.set(ctx);
  }
}
