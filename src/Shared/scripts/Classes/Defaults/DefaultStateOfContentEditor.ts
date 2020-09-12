import { IDataStateOfContentEditor } from "../../Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataStateOfTree } from "../../Interfaces/Data/iDataTreeState";

export class DefaultStateOfContentEditor implements IDataStateOfContentEditor {
    StateOfTree: IDataStateOfTree;
}
