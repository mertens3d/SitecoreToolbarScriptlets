import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { IStateOfScContentTreeNodeShallow } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat";
import { ContentEditorSFProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScContentTreeNodeProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";

export interface INativeClassNameChangeEvent_Payload {
  MutatedNodeStateOfScContentTreeNodeFlat: IStateOfScContentTreeNodeShallow;
  OwnerContentEditorProxy: ContentEditorSFProxy;
  ActiveNode: ScContentTreeNodeProxy;
  MutatedElement: HTMLElement;
  StateOfContentEditorTreeProxy: IStateOfContentTree;
}