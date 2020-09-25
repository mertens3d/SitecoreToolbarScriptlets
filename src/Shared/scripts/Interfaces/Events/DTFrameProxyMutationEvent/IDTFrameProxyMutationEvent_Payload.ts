import { IContentEditorProxyMutationEvent_Payload } from "../ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { IDTFrameProxy } from "../../Proxies/IDesktopProxy";

export interface IDTFrameProxyMutationEvent_Payload {
  DTFrameProxy: IDTFrameProxy;
  ContentEditorProxyMutationPayload: IContentEditorProxyMutationEvent_Payload;
}
