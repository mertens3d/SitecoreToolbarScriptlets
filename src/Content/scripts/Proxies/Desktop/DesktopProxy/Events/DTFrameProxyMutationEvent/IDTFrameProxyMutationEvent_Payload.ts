import { IContentEditorProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../../../DTFrameProxy";

export interface IDTFrameProxyMutationEvent_Payload {
  DTFrameProxy: DTFrameProxy;
  ContentEditorProxyMutationPayload: IContentEditorProxyMutationEvent_Payload;
}
