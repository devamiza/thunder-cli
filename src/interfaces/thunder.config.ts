import { ESLint } from './eslint';
import { PackageJson } from './package.json';

export interface ThunderConfig {
  render: string[];
  packageJson: PackageJson;
  linter: ESLint;
}
