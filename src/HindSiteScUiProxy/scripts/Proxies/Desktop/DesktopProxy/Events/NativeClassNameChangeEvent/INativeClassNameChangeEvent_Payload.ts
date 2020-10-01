import { IStateOfContentTree } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { IStateOfScContentTreeNodeFlat } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeFlat: IStateOfScContentTreeNodeFlat;
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}