import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { FrameProxy } from "./IDataOneIframe";
import { ContentEditorProxy } from "../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export interface IDataDesktopState {
  ActiveCeState: IDataOneStorageOneTreeState
  ActiveCEAgent: ContentEditorProxy;
  HostedIframes: FrameProxy[];
  HostedContentEditors: IDataOneStorageOneTreeState[]
}