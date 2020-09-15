import { CEFrameProxy } from "../../../../CEFrameProxy";
import { ICEFrameProxyMutationEvent_Payload } from "../FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";

export interface IDesktopProxyMutationEvent_Payload {
  AddedCEFrameProxies: CEFrameProxy[];
  FrameProxyMutationEvent_Payload: ICEFrameProxyMutationEvent_Payload;
  MutatedElement: HTMLElement; //todo - needed?
}