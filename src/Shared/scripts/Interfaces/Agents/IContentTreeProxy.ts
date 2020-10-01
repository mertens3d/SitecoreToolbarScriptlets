import { TreeMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { IStateOfContentTree } from "../Data/States/IStateOfContentTree";

export interface IContentTreeProxy {
  TriggerActiveNodeChangeEvent();
  WireEvents_TreeProxy();
  Instantiate_TreeProxy();
  GetStateOfContentTree(): Promise<IStateOfContentTree>;
  SetStateOfContentTree(dataToRestore: IStateOfContentTree): Promise<void>;
  TreeMutationEvent_Subject: TreeMutationEvent_Subject;
}