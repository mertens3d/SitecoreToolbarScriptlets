import { ContentEditorTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export interface IPayload_ContentEditorTreeMutatedEvent {
  MutatedElement: HTMLElement;
  ActiveNode: ContentEditorTreeNodeProxy;
  AssociatedIframeElemId: string;

}
