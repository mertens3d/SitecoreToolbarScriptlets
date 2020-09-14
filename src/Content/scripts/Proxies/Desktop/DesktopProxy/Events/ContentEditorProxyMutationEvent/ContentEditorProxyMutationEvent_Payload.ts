import { ITreeMutationEvent_Payload } from "../TreeMutationEvent/ITreeMutationEvent_Payload";
import { ContentEditorProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";

export interface IContentEditorProxyMutationEvent_Payload {
  ContentEditorProxy: ContentEditorProxy;
  MutatedElement: HTMLElement;
  AddedIframes: HTMLIFrameElement[];
  TreeMutation: ITreeMutationEvent_Payload;
}