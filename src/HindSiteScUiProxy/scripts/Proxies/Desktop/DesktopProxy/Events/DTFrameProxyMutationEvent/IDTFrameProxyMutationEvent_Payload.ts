import { IContentEditorProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";

export interface IDTFrameProxyMutationEvent_Payload {
  DTFrameProxy: DTFrameProxy;
  ContentEditorProxyMutationPayload: IContentEditorProxyMutationEvent_Payload;
}
