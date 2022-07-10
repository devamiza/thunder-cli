export interface ESLint {
  env: Env;
  ignorePatterns: string[];
  extends: string[];
  parser: string;
  parserOptions: ParserOptions;
  plugins: string[];
  rules: Rules;
}

export interface Env {
  browser: boolean;
  es2021: boolean;
  node: boolean;
  jest: boolean;
}

export interface ParserOptions {
  ecmaVersion: string;
  sourceType: string;
  project: string[];
}

export type Rules = Record<string, string | Array<unknown> | number>;
