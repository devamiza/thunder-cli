import figlet from 'figlet';
import { inspect, InspectOptions } from 'util';
import prettier from 'prettier/standalone';
import typescriptParser from 'prettier/parser-typescript';
import babelParser from 'prettier/parser-babel';
import { PartialRecord } from '../interfaces';

export default class Utility {
  public static capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  public static camelCase(s: string) {
    return s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
  }

  public static kebabCase(s: string) {
    return s.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase());
  }

  public static toValidPackageName(s: string) {
    return s.toLowerCase().replace(/(^@.*\/)|((^[^a-zA-Z]+)|[^\w.-])|([^a-zA-Z0-9]+$)/g, '');
  }

  public static getLogoText() {
    return figlet.textSync('Thunder', { font: 'Fire Font-k' });
  }

  public static stringifyObject = (object: any) => {
    const utilOptions: InspectOptions = { showHidden: false, compact: false, depth: null };
    return inspect(object, utilOptions);
  };

  public static appendToStringifiedObject = (data: PartialRecord<any, any>): string => {
    const before = data;
    let value = '';
    Object.keys(before).forEach((k) => {
      value += `"${k}": "${before[k]}",\n`;
    });

    return value;
  };

  public static formatCode = (code: string) =>
    prettier.format(code, {
      parser: 'json',
      plugins: [typescriptParser, babelParser],
      tabWidth: 2,
      semi: true,
      bracketSpacing: true,
      printWidth: 125,
    });

  public static dirname(meta: any) {
    return new URL('', meta.url).pathname.split('/').slice(0, -1).join('/');
  }
}
