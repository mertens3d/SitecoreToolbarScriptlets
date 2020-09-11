import { IDataStateOfContentEditor } from "../Data/IDataOneStorageOneTreeState";
import { IDataStateOfTreeNode } from "../Data/IDataOneTreeNode";

export interface IFirstActive {
  contentEditorState: IDataStateOfContentEditor,
  activeTreeNode: IDataStateOfTreeNode
}