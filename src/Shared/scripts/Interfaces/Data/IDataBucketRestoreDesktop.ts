import { FrameProxy } from "./Proxies/FrameProxy";
import { IDataStateOfContentEditor } from "./IDataOneStorageOneTreeState";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: FrameProxy[],
  oneTreeState: IDataStateOfContentEditor,
  targetDoc: IDataOneDoc,
}