import { IDataOneDoc } from "../Data/IDataOneDoc";
import { IDataStateOfTree } from "../Data/iDataTreeState";

export interface IContentEditorTreeProxy {
  AddListenerToTreeMutationEvent(bar: Function);
  //GetOneLiveTreeData(): IDataStateOfTreeNode[];
  GetStateOfTree(): IDataStateOfTree;
  SetStateOfTree(dataToRestore: IDataStateOfTree);
}