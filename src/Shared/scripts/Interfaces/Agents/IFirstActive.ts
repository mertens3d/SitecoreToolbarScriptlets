import { IStateOfScContentTreeNodeProxy } from "../Data/States/IDataStateOfScContentTreeNode";
import { IStateOfContentEditorProxy } from "../Data/States/IDataStateOfContentEditor";

export interface IFirstActive {
  StateOfContentEditorProxy: IStateOfContentEditorProxy,
  activeTreeNode: IStateOfScContentTreeNodeProxy
}