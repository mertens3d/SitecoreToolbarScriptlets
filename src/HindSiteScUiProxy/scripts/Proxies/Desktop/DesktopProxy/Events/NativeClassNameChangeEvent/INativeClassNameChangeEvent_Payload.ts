import { IStateOfContentTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { IStateOfScContentTreeNodeDeep } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNode: IStateOfScContentTreeNodeDeep;
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}