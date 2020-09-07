import { IframeProxy } from "./IDataOneIframe";
import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: IframeProxy[],
  oneTreeState: IDataOneStorageOneTreeState,
  targetDoc: IDataOneDoc,
}