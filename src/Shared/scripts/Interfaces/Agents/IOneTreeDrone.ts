import { ContentEditorTreeMutationEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/ContentEditorTreeMutationEvent_Subject";
import { IDataStateOfTree } from "../Data/States/IDataStateOfTree";

export interface IContentEditorTreeProxy {
  //RegisterObserver(observer: IGeneric_Observer<ITreeMutatedEvent_Payload>);
  //GetOneLiveTreeData(): IDataStateOfTreeNode[];
  GetStateOfTree(): IDataStateOfTree;
  SetStateOfTree(dataToRestore: IDataStateOfTree);
  TreeMutationEvent_Subject: ContentEditorTreeMutationEvent_Subject;
}