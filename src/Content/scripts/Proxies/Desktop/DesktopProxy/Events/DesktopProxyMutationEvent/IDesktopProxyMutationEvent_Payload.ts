import { IDTFrameProxyMutationEvent_Payload } from "../../../../../../../Shared/scripts/Interfaces/Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDTFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";

export interface IDesktopProxyMutationEvent_Payload {
  AddedDTFrameProxies: IDTFrameProxy[];
  DTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload;
  MutatedElement: HTMLElement; //todo - needed?
}