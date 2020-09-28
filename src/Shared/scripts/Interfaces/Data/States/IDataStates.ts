import { IDataStateOfDesktop } from './IDataStateOfDesktop';
import { IDataStateOfContentEditor } from './IDataStateOfContentEditor';
export interface IDataStateOfSitecoreWindow {
    StateOfContentEditor: IDataStateOfContentEditor;
    StateOfDesktop: IDataStateOfDesktop;
}
