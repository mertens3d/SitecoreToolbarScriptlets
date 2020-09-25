import { IContentEditorProxy } from "../../../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { IDataStateOfTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface ITreeMutationEvent_Payload {
  OwnerContentEditorProxy: IContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfTree: IDataStateOfTree;
}