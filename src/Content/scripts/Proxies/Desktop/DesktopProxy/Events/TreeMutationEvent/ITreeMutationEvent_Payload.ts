import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { IDataStateOfTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";

export interface ITreeMutationEvent_Payload {
  ActiveNode: ScContentTreeNodeProxy;
  AssociatedIframeElemId: string;
  MutatedElement: HTMLElement;
  StateOfTree: IDataStateOfTree;
}