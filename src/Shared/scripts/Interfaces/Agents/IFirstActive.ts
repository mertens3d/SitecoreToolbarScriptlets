import { IDataStateOfScContentTreeNode } from "../Data/States/IDataStateOfScContentTreeNode";
import { IDataStateOfContentEditor } from "../Data/States/IDataStateOfContentEditor";

export interface IFirstActive {
  StateOfContentEditor: IDataStateOfContentEditor,
  activeTreeNode: IDataStateOfScContentTreeNode
}