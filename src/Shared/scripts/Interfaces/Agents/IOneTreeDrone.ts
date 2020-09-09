import { IDataOneTreeNode } from "../Data/IDataOneTreeNode";
import { IDataOneStorageOneTreeState } from "../Data/IDataOneStorageOneTreeState";
import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IContentEditorTreeProxy {
  AddListenerToTreeMutationEvent(bar: Function);
  GetOneLiveTreeData(): IDataOneTreeNode[];
  GetTreeState(): Promise<IDataOneStorageOneTreeState>;
  WaitForAndRestoreManyAllNodes(dataToRestore: IDataOneStorageOneTreeState, AssociatedDoc: IDataOneDoc);
}