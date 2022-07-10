import FileManager from '../file.manager';
import Context from './context';

export default class Core {
  public static fileManager = FileManager;

  public static context = Context.getContextInstance();
}
