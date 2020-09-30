import { IStateOfScContentTreeNodeDeep } from "../Data/States/IStateOfScContentTreeNode";
import { IStateOfContentEditor } from "../Data/States/IStateOfContentEditor";

export interface IFirstActive {
  StateOfContentEditorProxy: IStateOfContentEditor,
  activeTreeNode: IStateOfScContentTreeNodeDeep
}