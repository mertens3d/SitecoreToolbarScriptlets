import { IDataOneTreeNode } from "../Data/IDataOneTreeNode";
import { IDataOneStorageOneTreeState } from "../Data/IDataOneStorageOneTreeState";
import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IContentEditorTreeProxy {
    WaitForAndRestoreManyAllNodes(dataToRestore: IDataOneStorageOneTreeState, AssociatedDoc: IDataOneDoc);
    AddListenerToTreeMutationEvent(bar: any);
    GetOneLiveTreeData(): IDataOneTreeNode[];
}
