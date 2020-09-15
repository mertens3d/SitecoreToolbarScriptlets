import { IContentEditorProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload";
import { CEFrameProxy } from "../../../../CEFrameProxy";

export interface ICEFrameProxyMutationEvent_Payload {
  CeFrameProxy: CEFrameProxy;
  ContentEditorProxyMutationPayload: IContentEditorProxyMutationEvent_Payload;
}
