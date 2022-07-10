import FileManager from '../lib/file.manager';

export type DirFilesReturn = ReturnType<typeof FileManager['getDirFiles']>;

export interface File {
  name: string;
  path: string;
  isFile: boolean;
}
