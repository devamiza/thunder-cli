import { HandlerInput, PartialRecord } from '../interfaces';
import Utility from './utility';

type TemplateKeys = keyof HandlerInput;
export default class TemplateRender {
  private static template = new Map<TemplateKeys, string>([
    ['projectName', '{{projectName}}'],
    ['dependencies', `"{{dependencies}}": ""`],
    ['devDependencies', `"{{devDependencies}}": "",`],
  ]);

  public static render(body: string, data: PartialRecord<TemplateKeys, string | PartialRecord<any, any> | undefined>) {
    let renderedData = body;
    for (const [key, templateExpression] of this.template) {
      let value = data[key as TemplateKeys] || '';
      if (typeof value === 'object') {
        if (Object.values(value).length === 0) value = '';
        else {
          value = Utility.appendToStringifiedObject(value);
        }
      }

      const regex = new RegExp(templateExpression!, 'ig');

      renderedData = renderedData.replace(regex, value);
    }

    console.log({ renderedData });

    return renderedData;
  }
}
