import { DTFrameProxy } from "../../../../DTFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "../DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";

export interface IDesktopProxyMutationEvent_Payload {
  AddedDTFrameProxies: DTFrameProxy[];
  DTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload;
  MutatedElement: HTMLElement; //todo - needed?
}