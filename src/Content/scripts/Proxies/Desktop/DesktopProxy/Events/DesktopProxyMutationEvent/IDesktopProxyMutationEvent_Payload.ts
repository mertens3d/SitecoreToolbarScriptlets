import { CEFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxyForContentEditor";
import { IFrameProxyMutationEvent_Payload } from "../FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";

export interface IDesktopProxyMutationEvent_Payload {
  MutatedElement: HTMLElement;
  AddedCEFrameProxies: CEFrameProxy[];
  FrameProxyMutationEvent_Payload: IFrameProxyMutationEvent_Payload;
}