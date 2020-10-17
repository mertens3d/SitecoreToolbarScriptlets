import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTree";
import { IStateOfScContentTreeNodeShallow } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfScContentTreeNodeShallow";
import { ContentEditorProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScContentTreeNodeProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeFlat: IStateOfScContentTreeNodeShallow;
  OwnerContentEditorProxy: ContentEditorProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}