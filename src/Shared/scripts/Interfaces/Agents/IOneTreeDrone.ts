import { TreeMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { IDataStateOfTree } from "../Data/States/IDataStateOfTree";

export interface IContentEditorTreeProxy {
  Instantiate_TreeProxy();
  GetStateOfTree(): IDataStateOfTree;
  SetStateOfTree(dataToRestore: IDataStateOfTree): Promise<void>;
  TreeMutationEvent_Subject: TreeMutationEvent_Subject;
}