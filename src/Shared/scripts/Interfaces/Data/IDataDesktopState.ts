import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataOneIframe } from "./IDataOneIframe";
import { ContentEditorAgent } from "../../../../Content/scripts/Agents/ContentEditorAgent/ContentEditorAgent";

export interface IDataDesktopState {
  ActiveCeState: IDataOneStorageOneTreeState
  ActiveCEAgent: ContentEditorAgent;
  HostedIframes: IDataOneIframe[];
  HostedContentEditors: IDataOneStorageOneTreeState[]
}