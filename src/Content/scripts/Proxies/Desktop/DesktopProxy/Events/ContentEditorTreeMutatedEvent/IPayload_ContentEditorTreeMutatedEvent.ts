import { TreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface IPayload_ContentEditorTreeMutatedEvent {
  ActiveNode: TreeNodeProxy;
  AssociatedIframeElemId: string;
  MutatedElement: HTMLElement;
}