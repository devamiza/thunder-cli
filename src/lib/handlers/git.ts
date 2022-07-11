import { execSync } from 'child_process';
import Core from '../core/index.js';
import Spinner from '../spinner.js';

export default class GitHandler extends Core {
  public static async run(): Promise<void> {
    const ctx = this.context.get();
    Spinner.createSpinner('git', 'Initializing git.').start('git');
    execSync('git init -q', { cwd: ctx.destination });
    Spinner.success('git');
  }
}
