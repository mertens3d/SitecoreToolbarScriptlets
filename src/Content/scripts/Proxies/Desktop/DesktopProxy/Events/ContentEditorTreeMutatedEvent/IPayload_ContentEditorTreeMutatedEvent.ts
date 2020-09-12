import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface ITreeMutatedEvent_Payload {
  ActiveNode: ScContentTreeNodeProxy;
  AssociatedIframeElemId: string;
  MutatedElement: HTMLElement;
}