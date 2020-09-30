import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorTreeProxy/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { IStateOfContentEditorTreeProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { IStateOfScContentTreeNodeProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeProxy: IStateOfScContentTreeNodeProxy;
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentEditorTreeProxy;
}