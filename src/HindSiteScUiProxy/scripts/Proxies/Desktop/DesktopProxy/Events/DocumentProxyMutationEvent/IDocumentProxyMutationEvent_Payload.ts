import { NativeIframeProxy } from "../../../../NativeScIframeProxy";

export interface IDocumentProxyMutationEvent_Payload {
  RemovedIFrameIds: string[];
  AddedNativeIFrameProxies: NativeIframeProxy[];
}
