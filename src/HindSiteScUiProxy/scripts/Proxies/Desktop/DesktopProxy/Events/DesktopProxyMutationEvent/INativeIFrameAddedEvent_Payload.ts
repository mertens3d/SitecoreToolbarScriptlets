import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "../DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";

export interface INativeIFrameAddedEvent_Payload {
  AddedDTFrameProxies: DTFrameProxy[];
  DTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload;
  MutatedElement: HTMLElement; //todo - needed?
}