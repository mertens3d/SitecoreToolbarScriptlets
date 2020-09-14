import { ITreeMutationEvent_Payload } from "../TreeMutationEvent/ITreeMutationEvent_Payload";

export interface IContentEditorProxyMutationEvent_Payload {
  MutatedElement: HTMLElement;
  AddedIframes: HTMLIFrameElement[];
  TreeMutation: ITreeMutationEvent_Payload;
}