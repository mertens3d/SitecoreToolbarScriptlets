import { IStateOfContentEditor } from "../Data/States/IStateOfContentEditor";
import { IStateOfScContentTreeNodeFlat } from "../Data/States/IStateOfScContentTreeNodeFlat";

export interface IFirstActive {
  StateOfContentEditorProxy: IStateOfContentEditor,
  activeTreeNodeFlat: IStateOfScContentTreeNodeFlat
}