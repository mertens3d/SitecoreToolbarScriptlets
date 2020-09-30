import { IStateOfContentTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { IStateOfScContentTreeNode } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeProxy: IStateOfScContentTreeNode;
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}