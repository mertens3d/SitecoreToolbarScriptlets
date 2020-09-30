import { IDataStateOfDesktopProxy } from './IDataStateOfDesktop';
import { IStateOfContentEditorProxy } from './IDataStateOfContentEditor';
export interface IStateOfScWindowProxy {
    StateOfContentEditor: IStateOfContentEditorProxy;
    StateOfDesktopProxy: IDataStateOfDesktopProxy;
}
