import { FrameProxy } from "./Proxies/FrameProxy";
import { IDataOneDoc } from "./IDataOneDoc";
import { IDataStateOfContentEditor } from "./States/IDataStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: FrameProxy[],
  oneTreeState: IDataStateOfContentEditor,
  targetDoc: IDataOneDoc,
}