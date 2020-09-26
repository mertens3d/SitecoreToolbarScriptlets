import { TreeMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject";
import { IDataStateOfTree } from "../Data/States/IDataStateOfTree";
import { InitResultsScWindowManager } from "./InitResultsScWindowManager";

export interface IContentEditorTreeProxy {
  OnReadyInitTreeProxy();
  GetStateOfTree(): IDataStateOfTree;
  SetStateOfTree(dataToRestore: IDataStateOfTree);
  TreeMutationEvent_Subject: TreeMutationEvent_Subject;
}