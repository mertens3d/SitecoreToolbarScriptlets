import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDataOneDoc } from "../Data/IDataOneDoc";
import { IDataStateOfDesktop } from "../Data/States/IDataStateOfDesktop";
import { IDataStateOfContentEditor } from "../Data/States/IDataStateOfContentEditor";
import { ITreeMutationEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload";
import { IDataStateOfDTFrame } from "../Data/States/IDataStateOfDTFrame";
import { ICommandHandlerDataForContent } from "../ICommandHandlerDataForContent";

export interface IContentEditorProxy {
  ContentEditorProxyOnTreeMutationEvent(payload: ITreeMutationEvent_Payload);
  SetCompactCss();
  GetStateOfContentEditor(): IDataStateOfContentEditor;
  SetStateOfContentEditor(StateOfContentEditor: IDataStateOfContentEditor);
}
export interface IDesktopStartBarProxy {
    OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload);
    GetAssociatedDoc();
}
export interface IDTFrameProxy {
  HTMLIframeElement: HTMLIFrameElement;
  SetStateOfDTFrame(oneTreeState: IDataStateOfDTFrame);
  OnReadyInitDTFrameProxy(): any;
}

export interface IDesktopProxy {
  AddDTFrameProxyAsync(dtFrameProxy: IDTFrameProxy): any;
  DesktopStartBarAgent: IDesktopStartBarProxy;
  OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload);
  GetStateOfDesktop();
  OnReadyInitDesktopProxy(): any;
  GetAssociatedDoc(): IDataOneDoc;
  SetStateOfDesktop(StateOfDesktop: IDataStateOfDesktop, commanddata: ICommandHandlerDataForContent): Promise<void> ;
}