import { IContentEditorProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";

export interface IDTFrameProxyMutationEvent_Payload {
  FrameId: string;
  ContentEditorProxyMutationPayload: IContentEditorProxyMutationEvent_Payload;
}
