import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IframeProxy } from "./IDataOneIframe";
import { ContentEditorProxy } from "../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export interface IDataDesktopState {
  ActiveCeState: IDataOneStorageOneTreeState
  ActiveCEAgent: ContentEditorProxy;
  HostedIframes: IframeProxy[];
  HostedContentEditors: IDataOneStorageOneTreeState[]
}