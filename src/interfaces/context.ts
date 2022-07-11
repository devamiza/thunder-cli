import { ConfigAnswer } from './answers.js';
import { File } from './file.manager.js';
import { ThunderConfig } from './thunder.config.js';

export interface Context {
  destination: string;
  files: File[];
  config: ThunderConfig;
  templatePath: string;
  answers: ConfigAnswer;
}
