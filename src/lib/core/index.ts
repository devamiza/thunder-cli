import FileManager from '../file.manager.js';
import Context from './context.js';

export default class Core {
  public static fileManager = FileManager;

  public static context = Context.getContextInstance();
}
