import { IDTFrameProxyMutationEvent_Payload } from "../DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";

export interface IDTAreaProxyMutationEvent_Payload {
  DTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload,
  AddedDTFrameProxies: DTFrameProxy[]
  RemovedDTFrameProxies: DTFrameProxy[]
}
