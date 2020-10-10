import { I_ContentTreeBasedProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";

export interface IDTFrameProxyMutationEvent_Payload {
  FrameId: string;
  ContentEditorProxyMutationPayload: I_ContentTreeBasedProxyMutationEvent_Payload;
}
