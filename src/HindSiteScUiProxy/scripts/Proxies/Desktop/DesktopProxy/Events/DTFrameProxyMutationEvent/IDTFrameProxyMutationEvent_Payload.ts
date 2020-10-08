import { I_ContentTreeBasedProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";

export interface IDTFrameProxyMutationEvent_Payload {
  FrameId: string;
  ContentEditorProxyMutationPayload: I_ContentTreeBasedProxyMutationEvent_Payload;
}
