import { IDataStateOfContentEditor } from "../Data/IDataOneStorageOneTreeState";
import { IDataStateOfScContentTreeNode } from "../Data/IDataOneTreeNode";

export interface IFirstActive {
  StateOfContentEditor: IDataStateOfContentEditor,
  activeTreeNode: IDataStateOfScContentTreeNode
}