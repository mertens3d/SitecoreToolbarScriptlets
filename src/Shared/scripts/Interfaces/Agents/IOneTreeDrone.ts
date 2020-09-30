import { TreeMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { IStateOfContentEditorTreeProxy } from "../Data/States/IDataStateOfTree";

export interface IContentTreeProxy {
  WireEvents_TreeProxy();
  Instantiate_TreeProxy();
  GetStateOfContentEditorTreeProxy(): Promise<IStateOfContentEditorTreeProxy>;
  SetStateOfTree(dataToRestore: IStateOfContentEditorTreeProxy): Promise<void>;
  TreeMutationEvent_Subject: TreeMutationEvent_Subject;
}