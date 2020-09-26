import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorTreeProxy/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { IDataStateOfTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";

export interface ITreeMutationEvent_Payload {
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfTree: IDataStateOfTree;
}