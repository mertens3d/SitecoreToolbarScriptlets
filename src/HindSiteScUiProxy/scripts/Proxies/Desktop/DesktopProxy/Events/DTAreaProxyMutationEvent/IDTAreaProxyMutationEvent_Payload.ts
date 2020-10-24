import { IScFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "../DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";

export interface IDTAreaProxyMutationEvent_Payload {
  DTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload,
  AddedDTFrameProxies: IScFrameProxy[]
  RemovedDTFrameProxies: IScFrameProxy[]
}
