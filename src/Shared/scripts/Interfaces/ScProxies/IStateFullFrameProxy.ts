import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DTFrameProxyMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { _BaseElemProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseElemProxy";
import { DocReadyState } from "../../Enums/ReadyState";
import { IStateOfDTFrame } from "../StateOf/IStateOfDTFrame";

export interface IScFrameProxy extends _BaseElemProxy<IStateOfDTFrame> {
  DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  GetHostedAsDocumentJacket(): DocumentJacket;
  GetNativeFrameId(): string;
  WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState>;
}