import { ContentEditorTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface IPayload_ContentEditorTreeMutatedEvent {
  ActiveNode: ContentEditorTreeNodeProxy;
  AssociatedIframeElemId: string;
  MutatedElement: HTMLElement;
}