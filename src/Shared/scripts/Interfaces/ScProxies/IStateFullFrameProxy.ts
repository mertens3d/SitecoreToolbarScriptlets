import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { DocReadyState } from "../../Enums/ReadyState";
import { IProxyCommand } from "./IBaseScProxy";
import { IScElemProxy } from "./IStateFullElemProxy";

export interface IScFrameProxy extends IScElemProxy {
  SendCommand(flowCommand: IProxyCommand): void;
  GetScWindowType(): ScWindowType;
  OnContentEditorProxyMutation(payload: I_ContentTreeBasedProxyMutationEvent_Payload): void;
  DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  GetHostedAsDocumentJacket(): DocumentJacket;
  GetNativeFrameId(): string;
  WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState>;
}