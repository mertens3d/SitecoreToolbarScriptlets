import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTree";
import { IStateOfScContentTreeNodeShallow } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNodeShallow";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeFlat: IStateOfScContentTreeNodeShallow;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}