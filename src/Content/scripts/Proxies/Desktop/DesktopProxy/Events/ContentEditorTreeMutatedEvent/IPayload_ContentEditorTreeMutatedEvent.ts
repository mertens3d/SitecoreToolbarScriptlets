import { TreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface ITreeMutatedEvent_Payload {
  ActiveNode: TreeNodeProxy;
  AssociatedIframeElemId: string;
  MutatedElement: HTMLElement;
}