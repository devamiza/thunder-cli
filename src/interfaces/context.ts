import { ConfigAnswer } from './answers';
import { File } from './file.manager';
import { ThunderConfig } from './thunder.config';

export interface Context {
  destination: string;
  files: File[];
  config: ThunderConfig;
  templatePath: string;
  answers: ConfigAnswer;
}
