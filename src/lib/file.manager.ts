import { existsSync, readdirSync, cpSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { File } from '../interfaces';

export default class FileManager {
  private static ignoredFiles = ['.DS_Store', 'thunder.config.ts'];

  public static isDirExists(dir: string) {
    const path = resolve(process.cwd(), dir);
    return existsSync(path);
  }

  public static getDirFiles(dir: string, options: { recursive: boolean; includeDir?: boolean }): File[] {
    const files: { name: string; path: string; isFile: boolean }[] = [];

    readdirSync(dir, { withFileTypes: true })
      .filter((i) => !this.ignoredFiles.includes(i.name))
      .forEach((dirent) => {
        const res = resolve(dir, dirent.name);

        if (dirent.isDirectory() && options.recursive) {
          if (options?.includeDir) files.push({ path: res, name: dirent.name, isFile: false });
          files.push(...FileManager.getDirFiles(res, { recursive: true }));
        } else {
          files.push({ path: res, name: dirent.name, isFile: true });
        }
      });

    return files;
  }

  public static copy(origin: string, dest: string) {
    readdirSync(origin, { withFileTypes: true })
      .filter((i) => !this.ignoredFiles.includes(i.name))
      .forEach((dirent) => cpSync(join(origin, dirent.name), join(dest, dirent.name), { recursive: true }));
  }

  public static write(path: string, content: string) {
    writeFileSync(path, content);
  }
}
