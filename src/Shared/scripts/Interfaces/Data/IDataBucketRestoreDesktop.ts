import { _BaseFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { IDataOneDoc } from "./IDataOneDoc";
import { IDataStateOfContentEditor } from "./States/IDataStateOfContentEditor";

export interface IDataBucketRestoreDesktop {
  LastChainLinkSuccessful: boolean,
  IFramesbefore: _BaseFrameProxy[],
  oneTreeState: IDataStateOfContentEditor,
  targetDoc: IDataOneDoc,
}