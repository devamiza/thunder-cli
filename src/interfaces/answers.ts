import { IPackageManager } from './package.manager';
import { Template } from './template';

export interface ConfigAnswer {
  projectName: string;
  template: Template;
  packageManager: IPackageManager;
  linter: 'None' | 'Airbnb' | 'Standard';
}
