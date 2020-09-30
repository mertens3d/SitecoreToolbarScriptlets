import { IStateOfContentEditorTreeProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { IStateOfScContentTreeNodeProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";

export interface ITreeProxyMutationEvent_Payload {
  //OwnerContentEditorProxy: ContentEditorProxy;
  //ActiveNode: ScContentTreeNodeProxy;
  //MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentEditorTreeProxy;
  //StateOfScContentTreeNodeProxy: IStateOfScContentTreeNodeProxy
}