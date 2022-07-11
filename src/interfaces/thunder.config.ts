import { ESLint } from './eslint.js';
import { PackageJson } from './package.json.js';

export interface ThunderConfig {
  render: string[];
  packageJson: PackageJson;
  linter: ESLint;
}
