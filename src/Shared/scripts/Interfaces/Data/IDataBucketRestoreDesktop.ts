import { IDataOneIframe } from "./IDataOneIframe";
import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: IDataOneIframe[],
  oneTreeState: IDataOneStorageOneTreeState,
  targetDoc: IDataOneDoc,
}