export interface HandlerInput {
  projectName: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}
