import { IDataStateOfContentEditor } from "../../Interfaces/Data/IDataOneStorageOneTreeState";
import { GuidData } from "../../Helpers/GuidData";
import { IDataStateOfTree } from "../../Interfaces/Data/iDataTreeState";

export class DefaultStateOfContentEditor implements IDataStateOfContentEditor {
    Id: GuidData;
    StateOfTree: IDataStateOfTree;
}
