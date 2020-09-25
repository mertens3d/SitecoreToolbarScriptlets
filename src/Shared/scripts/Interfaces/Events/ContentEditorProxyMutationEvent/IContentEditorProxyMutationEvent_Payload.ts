import { IContentEditorProxy } from "../../Proxies/IDesktopProxy";
import { ITreeMutationEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload";

export interface IContentEditorProxyMutationEvent_Payload {
  ContentEditorProxy: IContentEditorProxy;
  MutatedElement: HTMLElement;
  AddedIframes: HTMLIFrameElement[];
  TreeMutation: ITreeMutationEvent_Payload;
}