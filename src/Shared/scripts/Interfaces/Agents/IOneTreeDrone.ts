import { ITreeMutatedEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent";
import { IGeneric_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { IDataStateOfTree } from "../Data/States/IDataStateOfTree";

export interface IContentEditorTreeProxy {
  RegisterObserver(observer: IGeneric_Observer<ITreeMutatedEvent_Payload>);
  //GetOneLiveTreeData(): IDataStateOfTreeNode[];
  GetStateOfTree(): IDataStateOfTree;
  SetStateOfTree(dataToRestore: IDataStateOfTree);
}