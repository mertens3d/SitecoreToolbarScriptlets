import { IStateOfDesktop } from './IStateOfDesktop';
import { IStateOfContentEditor } from './IStateOfContentEditor';
export interface IStateOfScWindow {
    StateOfContentEditor: IStateOfContentEditor;
    StateOfDesktop: IStateOfDesktop;
}
