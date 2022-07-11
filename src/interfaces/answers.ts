import { IPackageManager } from './package.manager.js';
import { Template } from './template.js';

export interface ConfigAnswer {
  projectName: string;
  template: Template;
  packageManager: IPackageManager;
  linter: 'None' | 'Airbnb' | 'Standard';
}
