import { FrameProxy } from "./IDataOneIframe";
import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: FrameProxy[],
  oneTreeState: IDataOneStorageOneTreeState,
  targetDoc: IDataOneDoc,
}